/* eslint-disable no-undef */
figma.showUI(__html__, { height: 400, width: 300 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'place-icon') {
    const icon = figma.createNodeFromSvg(`<svg><path d="${msg.path}"/></svg>`);
    icon.name = msg.name;
    icon.x = figma.viewport.center.x;
    icon.y = figma.viewport.center.y;
    figma.currentPage.selection = [icon];
  }
};
