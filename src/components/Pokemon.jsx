const Pokemon = ({ pokemons }) => {
  return (
    <>
      {pokemons.map((pokemon, index) => (
        <p key={pokemon}>{`${index + 1}. ${pokemon}`}</p>
      ))}
    </>
  );
};

export default Pokemon;
