import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components';
import { fetchCars } from '@/utils';
import { HomeProps } from '@/types';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div id="discover" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard car={car} />
                ))}
              </div>

              <ShowMore
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={(searchParams.limit || 10) > allCars.length}
              />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/*
Doing it with react approach:
const [allCars, setAllCars] = useState([]);
const [manufacturer, setManufacturer]= useState('')
const [model, setModel]= useState('')
const [fuel, setFuel]= useState('')
const [year, setYear]= useState(2022)
const [limit, setLimit]= useState(10)

const getCars = async ({manufacturer, fuel, year, limit, model}) => {
  const result = await fetchCars( 
   { manufacturer: manufacturer || '',
    model: model || '',
    year: year || 2022,
    fuel: fuel || '',
    limit: limit || 10,
  });

    setAllCars(result)
}

useEffect(() => 
{getCars()}, [manufacturer, fuel, year, limit, model])

*/
