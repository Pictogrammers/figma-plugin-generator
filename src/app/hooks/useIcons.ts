import { useEffect, useState } from 'react';
import uFuzzy from '@leeoniya/ufuzzy';

import libraryMeta from '../data/libraryMeta.json';
import library from '../data/library.json';

export interface IconLibraryIcon {
  n: string; // Name
  p: string; // Path
  st: string[]; // Search Terms (Combined Index)
}

const useIcons = (filter: string) => {
  const [ visibleIcons, setVisibleIcons ] = useState<IconLibraryIcon[]>([]);

  useEffect(() => {
    const { i: icons } = library;

    if (filter === '') {
      return setVisibleIcons(icons);
    }

    const uf = new uFuzzy({});
    const haystack = icons.map((icon: IconLibraryIcon) => icon.st.join('¦'));
    const needle = filter || ''
      .replace(/([A-Z][a-z])/g, ' $1') // Add a space in front of letters is Pascal-case is used
      .replace(/(\d+)/g, ' $1') // Add a space in front of numbers if Pascal-case is used
      .replace(new RegExp(`(^${libraryMeta.id})`, 'gi'), '') // Remove a prefix of the library ID
      .toLowerCase();

    const idxs = uf.filter(haystack, needle);
    const info = uf.info(idxs, haystack, needle);
    const order = uf.sort(info, haystack, needle);
    const results = order.map((position) => icons[info.idx[position]]);

    setVisibleIcons(results);
  }, [ filter ]);

  return visibleIcons;
};

export default useIcons;
