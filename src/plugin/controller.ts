/* eslint-disable no-undef */

import libraryMeta from '../app/data/libraryMeta.json';

figma.showUI(__html__, {
  height: 550,
  title: libraryMeta.name,
  width: 400
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'place-icon') {
    const icon = figma.createNodeFromSvg(`<svg width="24" height="24"><path d="${msg.path}"/></svg>`);
    icon.name = msg.name;
    icon.x = Math.floor(figma.viewport.center.x);
    icon.y = Math.floor(figma.viewport.center.y);
    figma.currentPage.selection = [icon];
  }
};
