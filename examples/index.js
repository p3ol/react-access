import React, { useState, useEffect, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import {
  PaywallContext,
  Paywall,
  RestrictedContent,
  usePoool,
} from '@poool/react-access';

const Premium = () => {
  const [beforeInit, setBeforeInit] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [ready, setReady] = useState(null);
  const [mounted, setMounted] = useState(0);

  return (
    <div className="app">
      <RestrictedContent>
        <div className="articleBody">
          { /* eslint-disable max-len */ }
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor leo, sollicitudin quis posuere sed, pharetra cursus mauris. Donec ultricies nibh sit amet quam feugiat, vel bibendum nisl pellentesque. In hac habitasse platea dictumst. Sed varius eget ante ac pulvinar. Suspendisse fringilla, quam ac imperdiet consequat, leo massa molestie mi, eget condimentum ligula enim ut mauris. Aliquam egestas malesuada vestibulum. Etiam ut nibh turpis. Fusce mattis blandit bibendum. Vestibulum sodales laoreet lacus ut sollicitudin. Donec tempus iaculis viverra. In congue felis quis sem porta iaculis.
          </p>
          <p>
          Nam ut eleifend augue, ut facilisis turpis. Donec sodales sem gravida sem bibendum, id euismod orci viverra. Ut ornare eu metus et fringilla. Aliquam pulvinar commodo leo, eget ultrices arcu dapibus et. Proin iaculis venenatis ante scelerisque condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla ornare orci eget nisi rutrum gravida. Duis eu malesuada urna.
          </p>
          <p>
          Duis faucibus dolor in pharetra hendrerit. Integer eu sem et odio congue blandit a et libero. Phasellus tortor metus, semper non metus et, efficitur interdum felis. Morbi eget nisi eros. Sed bibendum tellus at orci tincidunt, quis laoreet nulla porttitor. Proin nunc metus, ornare vitae malesuada non, luctus nec elit. Aliquam erat volutpat. Vivamus bibendum facilisis mollis.
          </p>
          <p>
          Nulla facilisi. Praesent tempus elit id est tincidunt laoreet. Vestibulum mattis pretium ipsum, sed gravida orci ultrices quis. Proin tempor viverra ligula, ac maximus sapien accumsan non. Maecenas sed nunc vestibulum, elementum arcu ut, facilisis orci. Etiam a orci at nisi tincidunt mattis. Aliquam tempor ac nisi a eleifend. Quisque quis dictum justo. Morbi cursus venenatis dolor sit amet lobortis. Mauris id tempor massa, eleifend efficitur lectus.
          </p>
          <p>
          Proin nec purus mauris. Nulla sagittis, libero et interdum sagittis, urna massa aliquet tortor, id venenatis ligula magna ac nisi. Aliquam quis leo sollicitudin, feugiat nunc sed, tristique ipsum. Fusce pretium ligula in erat lacinia sodales. Sed aliquam sagittis nisl eget placerat. Duis finibus metus et venenatis iaculis. Curabitur maximus efficitur tortor, vel mollis nibh consectetur eu.
          </p>
          <p>
          Integer maximus pulvinar vestibulum. Etiam bibendum lorem eget ultricies cursus. Ut auctor sapien facilisis, aliquam tortor et, venenatis erat. Suspendisse pellentesque sapien a luctus finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc fringilla congue elit, vel tristique elit condimentum nec. Maecenas eu odio porttitor, aliquet arcu quis, consectetur sem. Proin a lorem ex.
          </p>
          <p>
          Integer eget posuere lectus. Pellentesque consequat interdum vestibulum. Cras ultricies nisl sit amet est interdum, at porttitor sapien tempus. Aenean arcu dolor, venenatis eget nulla efficitur, mollis mollis risus. Maecenas auctor placerat velit et mattis. Mauris fringilla sem at mi scelerisque, at volutpat sem pharetra. Donec turpis velit, fringilla at porta quis, gravida ac arcu. Nullam bibendum eu lectus vel faucibus. Nunc egestas euismod arcu id bibendum. Vestibulum venenatis hendrerit urna in pretium. Phasellus ipsum nulla, tincidunt eget suscipit euismod, accumsan hendrerit enim. In quis sem ac diam dictum convallis sit amet fermentum nisl. Integer molestie pharetra nulla quis scelerisque. Vivamus quis erat aliquet, tristique risus non, tristique neque. Nam imperdiet nunc elit, vel sagittis purus ultricies eu. Donec viverra maximus enim, non volutpat ex scelerisque in.
          </p>
          <p>
          Aliquam vitae vestibulum elit. Cras pharetra accumsan urna ut lobortis. Nulla malesuada, metus id interdum convallis, neque arcu vulputate lorem, a interdum velit nisi sit amet mauris. In nec lorem sit amet massa ornare viverra sagittis ac dui. Ut justo neque, dignissim vel eros sit amet, tristique semper sem. Maecenas ultrices libero consectetur velit semper ultricies. Donec non tellus dictum, luctus risus at, eleifend odio. Etiam ultrices non ligula vitae dictum. Etiam bibendum ex quis leo placerat, molestie aliquam sapien euismod. Nulla iaculis finibus lorem, sed fermentum sapien varius non. Aliquam sed lectus id est vulputate sagittis. Morbi enim mi, varius ac nisi in, scelerisque hendrerit lectus. Morbi efficitur eleifend ipsum, et semper elit consectetur id.
          </p>
          <p>
          Vivamus euismod, libero quis hendrerit bibendum, dui purus vestibulum nunc, in consectetur est sapien a enim. Morbi consectetur nisl maximus, hendrerit lacus nec, sollicitudin ante. Proin ante nibh, pharetra eget massa at, luctus viverra augue. Ut quis urna odio. Vivamus magna orci, laoreet nec porta eu, suscipit sit amet urna. Praesent ac scelerisque erat, sit amet eleifend metus. Morbi fermentum velit id dui fringilla, sed sodales mauris dapibus.
          </p>
          <p>
          Ut condimentum justo nec sapien convallis dictum. Pellentesque tempus rhoncus justo quis feugiat. Curabitur in sagittis elit. Nunc justo ligula, mattis ac tortor ut, interdum hendrerit risus. Aenean purus urna, pretium eu purus sit amet, suscipit ornare velit. Phasellus ut euismod nulla, nec tincidunt ex. Aliquam mattis nulla neque, ac dapibus magna fermentum eget. Nulla facilisis viverra odio ac viverra. Mauris cursus velit ex, quis pulvinar elit porttitor non. Vivamus consectetur leo at enim luctus, at convallis mi dapibus. Ut mauris neque, efficitur eu ante ac, scelerisque cursus tortor. Sed sed dolor sit amet velit finibus sodales. Duis tempor felis a sollicitudin pretium. Vestibulum ante eros, egestas a dapibus sit amet, suscipit ut ipsum.
          </p>
          <p>
          Integer maximus pulvinar vestibulum. Etiam bibendum lorem eget ultricies cursus. Ut auctor sapien facilisis, aliquam tortor et, venenatis erat. Suspendisse pellentesque sapien a luctus finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc fringilla congue elit, vel tristique elit condimentum nec. Maecenas eu odio porttitor, aliquet arcu quis, consectetur sem. Proin a lorem ex.
          </p>
          <p>
          Integer eget posuere lectus. Pellentesque consequat interdum vestibulum. Cras ultricies nisl sit amet est interdum, at porttitor sapien tempus. Aenean arcu dolor, venenatis eget nulla efficitur, mollis mollis risus. Maecenas auctor placerat velit et mattis. Mauris fringilla sem at mi scelerisque, at volutpat sem pharetra. Donec turpis velit, fringilla at porta quis, gravida ac arcu. Nullam bibendum eu lectus vel faucibus. Nunc egestas euismod arcu id bibendum. Vestibulum venenatis hendrerit urna in pretium. Phasellus ipsum nulla, tincidunt eget suscipit euismod, accumsan hendrerit enim. In quis sem ac diam dictum convallis sit amet fermentum nisl. Integer molestie pharetra nulla quis scelerisque. Vivamus quis erat aliquet, tristique risus non, tristique neque. Nam imperdiet nunc elit, vel sagittis purus ultricies eu. Donec viverra maximus enim, non volutpat ex scelerisque in.
          </p>
          <p>
          Aliquam vitae vestibulum elit. Cras pharetra accumsan urna ut lobortis. Nulla malesuada, metus id interdum convallis, neque arcu vulputate lorem, a interdum velit nisi sit amet mauris. In nec lorem sit amet massa ornare viverra sagittis ac dui. Ut justo neque, dignissim vel eros sit amet, tristique semper sem. Maecenas ultrices libero consectetur velit semper ultricies. Donec non tellus dictum, luctus risus at, eleifend odio. Etiam ultrices non ligula vitae dictum. Etiam bibendum ex quis leo placerat, molestie aliquam sapien euismod. Nulla iaculis finibus lorem, sed fermentum sapien varius non. Aliquam sed lectus id est vulputate sagittis. Morbi enim mi, varius ac nisi in, scelerisque hendrerit lectus. Morbi efficitur eleifend ipsum, et semper elit consectetur id.
          </p>
          <p>
          Vivamus euismod, libero quis hendrerit bibendum, dui purus vestibulum nunc, in consectetur est sapien a enim. Morbi consectetur nisl maximus, hendrerit lacus nec, sollicitudin ante. Proin ante nibh, pharetra eget massa at, luctus viverra augue. Ut quis urna odio. Vivamus magna orci, laoreet nec porta eu, suscipit sit amet urna. Praesent ac scelerisque erat, sit amet eleifend metus. Morbi fermentum velit id dui fringilla, sed sodales mauris dapibus.
          </p>
          <p>
          Ut condimentum justo nec sapien convallis dictum. Pellentesque tempus rhoncus justo quis feugiat. Curabitur in sagittis elit. Nunc justo ligula, mattis ac tortor ut, interdum hendrerit risus. Aenean purus urna, pretium eu purus sit amet, suscipit ornare velit. Phasellus ut euismod nulla, nec tincidunt ex. Aliquam mattis nulla neque, ac dapibus magna fermentum eget. Nulla facilisis viverra odio ac viverra. Mauris cursus velit ex, quis pulvinar elit porttitor non. Vivamus consectetur leo at enim luctus, at convallis mi dapibus. Ut mauris neque, efficitur eu ante ac, scelerisque cursus tortor. Sed sed dolor sit amet velit finibus sodales. Duis tempor felis a sollicitudin pretium. Vestibulum ante eros, egestas a dapibus sit amet, suscipit ut ipsum.
          </p>
          { /* eslint-enable max-len */ }
        </div>
      </RestrictedContent>

      <Paywall
        beforeInit={() => setBeforeInit(true) }
        afterMount={() => setMounted(old => old + 1)}
        events={{
          onReady: () => setReady(true),
          onIdentityAvailable: e => setIdentity(e),
        }}
      />

      <Link to="/">Return to home</Link>

      { /* FOR TESTING PURPOSES, DO NOT REMOVE */ }
      { beforeInit && (
        <div id="before-init">{ JSON.stringify(beforeInit) }</div>
      ) }
      { identity && (
        <div id="on-identity-available">{ JSON.stringify(identity) }</div>
      ) }
      { ready && (
        <div id="on-ready">{ JSON.stringify(ready) }</div>
      ) }
      { mounted && (
        <div id="mounted">{ JSON.stringify(mounted) }</div>
      ) }
      { /* END TESTING */ }
    </div>
  );
};

const Consent = () => {
  const { setEnabled } = useContext(AppContext);
  const [ready, setReady] = useState(null);
  const [mounted, setMounted] = useState(0);

  return (
    <div>
      <button
        id="consent-button"
        style={{ marginBottom: 100 }}
        onClick={setEnabled.bind(null, true)}
      >
        Give consent
      </button>
      <RestrictedContent>
        <div id="restricted-content">
          This sentence should be almost complete.
          This one should be entirely troncated, and if there&apos;s a rerender,
          the first one should not be touched again.
        </div>
      </RestrictedContent>
      <Paywall
        events={{ onReady: () => setReady(true) }}
        afterMount={() => setMounted(old => old + 1)}
      />

      { /* FOR TESTING PURPOSES, DO NOT REMOVE */ }
      { ready && (
        <div id="on-ready">{ JSON.stringify(ready) }</div>
      ) }
      { mounted && (
        <div id="mounted">{ JSON.stringify(mounted) }</div>
      ) }
      { /* END TESTING */ }
    </div>
  );
};

const Home = () => {
  const { poool, appId, config, styles, texts } = usePoool();

  useEffect(() => {
    poool?.('init', appId);
    poool?.('config', config);
    poool?.('send', 'page-view', 'page');

    return () => poool?.('flush');
  }, [poool]);

  return (
    <div>
      <h1>Home</h1>

      { /* FOR TESTING PURPOSES, DO NOT REMOVE */ }
      { typeof poool === 'function' && (
        <div id="has-poool">true</div>
      ) }
      { typeof appId === 'string' && (
        <div id="has-app-id">true</div>
      ) }
      { typeof config === 'object' && (
        <div id="has-config">true</div>
      ) }
      { typeof styles === 'object' && (
        <div id="has-styles">true</div>
      ) }
      { typeof texts === 'object' && (
        <div id="has-texts">true</div>
      ) }
      { /* END TESTING */ }

      <Link to="/premium">Go to premium</Link>
      <Link to="/consent">Go to consent</Link>
    </div>
  );
};

const AlternativeHome = () => (
  <div>
    <h1>Home without page view</h1>

    <Link id="premium-link" to="/premium">Go to premium</Link>
    <Link id="consent-link" to="/consent">Go to consent</Link>
  </div>
);

const AppContext = createContext({});
const defaultHistory = createBrowserHistory();

const App = () => {
  const [enabled, setEnabled] = useState(!(
    global.location.pathname === '/consent'
  ));

  defaultHistory.listen(location => {
    const pathname = location?.location?.pathname || location?.pathname;
    setEnabled(!(pathname === '/consent'));
  });

  return (
    <BrowserRouter history={defaultHistory}>
      <AppContext.Provider value={{ setEnabled }}>
        <PaywallContext
          appId="155PF-L7Q6Q-EB2GG-04TF8"
          config={{
            cookies_enabled: enabled,
            debug: true,
            custom_segment: 'react',
            cookies_domain: 'localhost',
            audit_load_timeout: 30000,
          }}
        >
          <Routes>
            <Route path="/premium" exact={true} element={<Premium />} />
            <Route path="/consent" exact={true} element={<Consent />} />
            <Route
              path="/alt-home"
              exact={true}
              element={<AlternativeHome />}
            />
            <Route exact={true} path="/" element={<Home />} />
          </Routes>
        </PaywallContext>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
