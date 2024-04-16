import Link from 'next/link';

import { Pixel } from '../components';

const Home = () => (
  <div>
    <h1>Home</h1>

    <div><Link href="/premium">Go to premium</Link></div>
    <div><Link href="/consent">Go to consent</Link></div>

    <Pixel type="page-view" data={{ type: 'page' }} />
  </div>
);

export default Home;
