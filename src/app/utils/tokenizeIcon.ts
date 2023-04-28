const tokenizeIcon = (name, aliases = []) => {
  const nameTokens = name.split('-');

  const aliasTokens = aliases.reduce((output, alias) => {
    alias.split('-').forEach((alias) => {
      if (output.indexOf(alias) === -1 && nameTokens.indexOf(alias) === -1) {
        output.push(alias);
      }
    });
    return output;
  }, []);

  return [ ...nameTokens, ...aliasTokens ];
};

export default tokenizeIcon;