import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Chip, InputAdornment, TextField } from '@mui/material';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline, mdiClose, mdiMagnify } from '@mdi/js';

import useDebounce from '../hooks/useDebounce';
import useIcons from '../hooks/useIcons';

import PictogrammersLogo from '../assets/pictogrammers-full-white.svg';

import libraryMeta from '../data/libraryMeta.json';

import '../styles/ui.css';

const App = () => {
  const virtuosoRef = useRef(null);
  const iconLibraryHeadingRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const visibleIcons = useIcons(debouncedSearchTerm);

  const placeIcon = (name: string, path: string) => {
    parent.postMessage({ pluginMessage: { name, path, type: 'place-icon' } }, '*');
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      virtuosoRef.current?.scrollToIndex({
        behavior: 'smooth',
        index: 0,
      });
    }
  }, [ debouncedSearchTerm, visibleIcons.length ]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    searchBoxRef.current?.focus();
    virtuosoRef.current?.scrollToIndex({
      behavior: 'smooth',
      index: 0,
    });
  };

  return (
    <div className='root'>
      <div className='heading' ref={iconLibraryHeadingRef}>
        <div className='libraryInfo'>
          <div className='libraryName'>
            <img src={libraryMeta.logo} alt={libraryMeta.name} />
            {libraryMeta.name}
          </div>
          <Chip
            color='primary'
            label={`v${libraryMeta.version}`}
            sx={{ backgroundColor: 'hsl(194deg 64% 41%)', fontSize: '.8rem', fontWeight: 600 }}
          />
        </div>
        <div className='controls'>
          <TextField
            classes={{ root: 'searchBox' }}
            fullWidth
            InputProps={{
              endAdornment: searchTerm && searchTerm !== '' && (
                <InputAdornment
                  onClick={handleSearchClear}
                  position='end'
                  sx={{ cursor: 'pointer' }}
                >
                  <Icon path={mdiClose} size={.9} />
                </InputAdornment>
              ),
              inputRef: searchBoxRef,
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon path={mdiMagnify} size={1} />
                </InputAdornment>
              )
            }}
            onChange={handleSearchChange}
            placeholder={`Search ${visibleIcons.length} Icon${visibleIcons.length === 1 ? '' : 's'}...`}
            size='small'
            sx={{
              margin: '0 1rem 0 0'
            }}
            value={searchTerm}
            variant='outlined'
          />
        </div>
      </div>
      <div className='libraryContainer'>
        {!visibleIcons.length ? (
          <div className='noResults'>
            <Icon path={mdiAlertCircleOutline} size={3} />
            <p>No icons were found based on your search criteria.</p>
          </div>
        ) : (
          <VirtuosoGrid
            data={visibleIcons}
            listClassName='library'
            itemContent={(index, icon) => (
              <button key={index} onClick={() => placeIcon(icon.n, icon.p)}>
                <Icon path={icon.p} size={1.25} />
              </button>
            )}
            ref={virtuosoRef}
          />
        )}
      </div>
      <footer>
        <a href='https://pictogrammers.com' target='_blank'>
          Icon Library by <img src={PictogrammersLogo} alt='Pictogrammers' />
        </a>
      </footer>
    </div>
  );
};

export default App;
