export const useProfile = () => {
  const generateUsername = () => {
    const nounSeeds = randomUsernameSeeds.nouns;
    const adjectiveSeeds = randomUsernameSeeds.adjectives;

    const id = Math.floor(Math.random() * (99 - 1) + 1);
    const noun = nounSeeds.at(Math.floor(Math.random() * nounSeeds.length));
    const adjective = adjectiveSeeds.at(
      Math.floor(Math.random() * adjectiveSeeds.length)
    );

    return adjective! + noun + id;
  };

  return { generateUsername };
};
