import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { HeroesListItem } from '../heroesListItem';
import { Spinner } from '../spinner';
import { activeFilterSelector } from '../../selectors';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../slices/apiHeroes';

export const HeroesList = () => {

  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
 
  const activeFilter = useSelector(activeFilterSelector);

  const filtredHeroes = useMemo(() => {
    const filtredHeroes = heroes.slice();

    if (activeFilter === 'all') {
      return filtredHeroes;
    } else {
      return filtredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);
  
  const [deleteHero] = useDeleteHeroMutation();

  const onDelete = useCallback((id) => {
    deleteHero(id);
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => (
      <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
    ));
  };

  const elements = renderHeroesList(filtredHeroes);
  return <ul>{elements}</ul>;
};
