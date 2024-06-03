import { useEffect } from 'react';

import { configValue } from './config';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { movieSlice } from '@/store/reducers/MovieReducer';
import GenreButton from './GenreButton/GenreButton';

import styles from './ControlPanel.module.scss';
import { Genre } from '@/store/reducers/GenresReducer';
import { createGenresAction } from '@/store/actions/createGenresAction';

function ControlPanel({
  isActive,
  genre,
  setGenre,
  setQuery,
  resetActive,
}: {
  isActive: boolean;
  genre: string;
  setGenre: (genre: string) => void;
  setQuery: (el: string) => void;
  resetActive: () => void;
}) {
  const { movieFetchingSuccess } = movieSlice.actions;
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ThemeReducer);
  const { genres, error } = useAppSelector((state) => state.GenresReducer);

  useEffect(() => {
    dispatch(createGenresAction());
  }, []);

  const toggleGenre = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = configValue(e);
    setGenre(value);
    dispatch(movieFetchingSuccess([]));
    setQuery('');
    resetActive();
  };

  if (error) return <h2>{error}. Попробуйте позже</h2>;

  return (
    <div className={`${styles.panel} ${isActive && styles.active} ${styles[theme]}`} data-testid="controls">
      {genres.length <= 1
        ? Array(32)
            .fill(null)
            .map((_, i) => <GenreButton key={i} className="stub" />)
        : genres.map((e: Genre, i: number) => (
            <GenreButton key={i} text={e.label} value={e.value} onClick={toggleGenre} className={genre === e.value ? 'active' : ''} />
          ))}
    </div>
  );
}

export default ControlPanel;
