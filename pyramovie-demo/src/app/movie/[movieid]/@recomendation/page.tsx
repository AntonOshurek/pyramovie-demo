import Image from 'next/image';
import Link from 'next/link';
/* API */
import filmsApi from '@/api/films-api';
/* STYLES */
import style from './similar-movies.module.css';

const Recomendation = async ({ params }: { params: { movieid: string } }) => {
	const similarMovies = await filmsApi.getRecomendationFilms('en', +params.movieid);

	return (
		<section className={`${style['similar-movies']} container`}>
			<div className={`${style['similar-movies__wrap']}`}>
				<h3 className={`${style['similar-movies__title']}`}>Recomendations</h3>

				<div className={`${style['similar-movies__slider']}`}>
					<ul className={style['similar-movies-list']}>
						{similarMovies?.results ? (
							similarMovies.results.map((similar) => {
								return (
									<li className={style['similar-movies-list__item']} key={similar.id}>
										<div className={`${style['similar-movies-list__info']}`}>
											<h4>{similar.title}</h4>
										</div>

										<Image
											className={style['similar-movies-list__poster-backdrop']}
											src={`https://image.tmdb.org/t/p/original${similar.poster_path}`}
											width={500}
											height={300}
											alt=""
										/>

										<Link
											className={style['similar-movies-list__item-link']}
											href={`/movie/${similar.id}`}
										>
											<span className="visually-hidden">
												link to ${similar.original_title} movie
											</span>
										</Link>
									</li>
								);
							})
						) : (
							<div className={style['error']}>error .... {JSON.stringify(similarMovies)}</div>
						)}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Recomendation;
