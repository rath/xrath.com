export const emojiMap: Record<string, string> = {
  ':@': '/emoticons/angry.png',
  ':(': '/emoticons/bad.png',
  ':$': '/emoticons/blush.png',
  '(@)': '/emoticons/cat.png',
  ':\'(': '/emoticons/cry.png',
  '(7)': '/emoticons/dog.png',
  '(&)': '/emoticons/dog.png',
  '(L)': '/emoticons/love.png',
  ':|': '/emoticons/watch.png',
  ':p': '/emoticons/melong.png',
  ':P': '/emoticons/melong.png',
  '(H)': '/emoticons/sunglass.png',
  ':S': '/emoticons/meh.png',
  ';)': '/emoticons/wink.png'
};

export function replaceEmojis(text: string): string {
  let result = text;
  
  // Sort by length in descending order to prevent partial replacements
  const sortedEmojis = Object.keys(emojiMap).sort((a, b) => b.length - a.length);
  
  sortedEmojis.forEach(emoji => {
    const escaped = emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    result = result.replace(regex, `<img src="${emojiMap[emoji]}" alt="${emoji}" class="inline-emoji" />`);
  });
  
  return result;
}