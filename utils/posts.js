import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// NOTE: [현재 프로젝트 디렉토리]/posts 를 담는 듯
const postsDirectory = path.join(process.cwd(), 'posts');

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
};

export const getPostData = async (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`); // directory/posts/[id].md
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // NOTE: data, content 분리
  const matterResult = matter(fileContents);

  // NOTE: html 형태로 반환 <div>hi<a>hh</a></div>..처럼
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 파일명, html을 string으로 바꾼것, YAML
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};
