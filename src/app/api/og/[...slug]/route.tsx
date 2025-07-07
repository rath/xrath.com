import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getPostBySlug } from '@/lib/posts';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string[] }> }
) {
  try {
    const params = await props.params;
    const slug = params.slug.join('/');
    const post = await getPostBySlug(slug);

    if (!post) {
      return new Response('Not found', { status: 404 });
    }

    // Extract first 150 characters of content (removing markdown)
    const plainContent = post.content
      .replace(/#+\s/g, '') // Remove headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/`/g, '') // Remove code blocks
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();

    const excerpt = plainContent.length > 150
      ? plainContent.substring(0, 150) + '...'
      : plainContent;

    // Format date
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString(post.lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // For now, use the default system font until we setup Korean fonts properly
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a1a',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.title}
            </h1>

            {/* Content excerpt */}
            <p
              style={{
                fontSize: '28px',
                color: '#e0e0e0',
                lineHeight: 1.5,
                flex: 1,
                marginTop: '20px',
                marginBottom: '40px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {excerpt}
            </p>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Author and date */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '24px', color: '#a0a0a0' }}>
                  {formattedDate}
                </span>
                <span style={{ fontSize: '20px', color: '#818cf8', marginTop: '8px' }}>
                  xrath.com
                </span>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: '18px',
                        color: '#ffffff',
                        backgroundColor: 'rgba(129, 140, 248, 0.2)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid rgba(129, 140, 248, 0.3)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
