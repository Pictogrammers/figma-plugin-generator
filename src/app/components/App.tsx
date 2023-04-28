import { useEffect, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import Icon from '@mdi/react';
import libraryMeta from '@mdi/svg/meta.json';
import * as mdi from '@mdi/js';

import kebabToPascal from '../utils/kebabToPascal';
import tokenizeIcon from '../utils/tokenizeIcon';

import '../styles/ui.css';

interface IconProps {
  deprecated: boolean;
  id: string;
  name: string;
  searchTokens: string[];
}

const App = () => {
  const [library, setLibrary] = useState<IconProps[] | null>(null);

  useEffect(() => {
    const getLatestLibrary = async () => {
      const libraryData = libraryMeta.map((icon) => {
        const {
          aliases,
          deprecated,
          id,
          name,
        } = icon;

        const searchTokens = tokenizeIcon(name, aliases);

        return {
          deprecated,
          id,
          name,
          searchTokens
        };
      });

      setLibrary(libraryData);
    };
    getLatestLibrary();
  }, []);

  const placeIcon = (name: string, path: string) => {
    parent.postMessage({ pluginMessage: { name, path, type: 'place-icon' } }, '*');
  };

  if (!library) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <VirtuosoGrid
        data={library}
        listClassName='library'
        itemContent={(index, icon) => {
          const iconPath = mdi[`mdi${kebabToPascal(icon.name)}`];
          return (
            <div key={index} onClick={() => placeIcon(icon.name, iconPath)}>
              <Icon path={iconPath} size={1.5} />
            </div>
          );
        }}
      />
    </div>
  );
};

export default App;
