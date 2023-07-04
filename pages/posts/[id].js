import { getAllPostIds, getPostData } from '../../utils/posts';

const Post = ({ postData }) => {
  return (
    <>
      <div>{postData.title}</div>
      <br />
      <div>{postData.date}</div>
    </>
  );
};

export default Post;

// NOTE: [id]에 들어갈 수 있는 목록 배열[{params: {id: Name}}, {params: {id: Name}}]
export const getStaticPaths = () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

// NOTE: 여기에 위에 적은 배열의 각 요소가 할당되는 것 같음. {params: {id: Name}}
export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};
