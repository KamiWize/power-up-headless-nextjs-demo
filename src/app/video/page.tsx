import axios from 'axios';
import { ArticleBody } from '../components/ArticleBody';

async function getData() {
  const { data } = await axios.get(
    `https://api.sandbox.crain.arcpublishing.com/content/v4/stories?website=automotivenews&_id=KIPAYM3I5JBQTOYKDU4GQSFOWU&published=false`,
    {
      headers: {
        Authorization: `Bearer PBBC684E2L1KEPTK2TOTC40MDK8DF0C4tWn7A5whLiPje5v5xaR1vBzbyyW1rEeFZ3N7kxEF`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
}

export default async function VideoView() {
  const { content_elements } = await getData();

  return <ArticleBody elements={content_elements} />;
}
