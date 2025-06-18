import mysql.connector
import json
import html
import re

DB_CONFIG = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'rath_wp',
    'charset': 'utf8mb4',
    'use_unicode': True
}

URL_REGEX = re.compile(
    r'^(https?://)'  # http:// or https://
    r'(([A-Za-z0-9-]+\.)+[A-Za-z]{2,})'  # domain...
    r'(:\d+)?'  # optional port
    r'(/.*)?$'  # optional path
)

POSTS_QUERY = """
        SELECT ID, post_title, post_content, post_name, post_date, post_date_gmt
        FROM wp_posts
        WHERE post_status = 'publish'
        ORDER BY post_date_gmt ASC
    """

COMMENTS_QUERY = """
        SELECT comment_ID, comment_author, comment_date_gmt, comment_content, comment_author_url
        FROM wp_comments
        WHERE comment_post_ID = %s
            AND comment_approved = 1
            AND comment_type = ''
    """

OUTPUT_JSON_FILE = 'wp_posts.json'

def fetch_comments(cursor, post_id):
    """Fetches and formats comments for a given post ID."""
    cursor.execute(COMMENTS_QUERY, (post_id,))
    comments_raw = cursor.fetchall()
    comments = []
    for comment_row in comments_raw:
        comment_data = {
            'id': comment_row['comment_ID'],
            'author': comment_row['comment_author'],
            'created': comment_row['comment_date_gmt'].strftime('%Y-%m-%d %H:%M:%S'),
            'content': comment_row['comment_content']
        }
        url = comment_row['comment_author_url']
        if url and URL_REGEX.match(url):
            comment_data['author_url'] = url
        comments.append(comment_data)
    return comments

def format_post_data(post_row, comments):
    """Formats a single post row along with its comments."""
    post_date = post_row['post_date']
    year = post_date.strftime('%Y')
    month = post_date.strftime('%m')
    full_name = f"{year}/{month}/{post_row['post_name']}"

    return {
        'id': post_row['ID'],
        'name': full_name,
        'title': html.unescape(post_row['post_title']),
        'content': post_row['post_content'],
        'created': post_row['post_date_gmt'].strftime('%Y-%m-%d %H:%M:%S'),
        'comments': comments
    }

def main():
    """Main function to fetch posts and comments and save them to a JSON file."""
    formatted_results = []
    connection = None
    cursor = None

    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor(dictionary=True)

        cursor.execute(POSTS_QUERY)
        posts = cursor.fetchall()

        for post in posts:
            decoded_title = html.unescape(post['post_title'])
            if not decoded_title.strip():
                continue

            comments = fetch_comments(cursor, post['ID'])
            formatted_post = format_post_data(post, comments)
            formatted_results.append(formatted_post)

        with open(OUTPUT_JSON_FILE, 'w', encoding='utf-8') as json_file:
            json.dump(formatted_results, json_file, indent=2, ensure_ascii=False)

        print(f"{len(formatted_results)} rows saved to '{OUTPUT_JSON_FILE}'.")

    except mysql.connector.Error as err:
        print(f"MySQL Error: {err}")
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

if __name__ == "__main__":
    main()
