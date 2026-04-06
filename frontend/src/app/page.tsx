'use client';

import MovieBlock from './Components/MovieBlock/MovieBlock';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-start items-start max-w-4xl w-full'>
        <h1 className='text-purple-900 font-bold text-2xl py-6'>
          Popularne filmy:
        </h1>
      </div>
      <div className='flex flex-col gap-6'>
        <MovieBlock
          movieId='1'
          imgUrl='https://goldenglobes.com/wp-content/uploads/2023/10/2008-sweeney_todd.jpg?w=1012'
          movieTitle='Sweeney Todd: Demoniczny Golibroda z Fleet Street'
          movieDesc='Benjamin Barker, po latach wygnania, wraca do Londynu. Pragnie zemścić się na okrutnym sędzi Turpinie, który skazał go, by posiąść jego żonę. Spotyka dawną sąsiadkę, Nellie Lovett. Opowiada ona Barkerowi o tym, że kiedy on był na wygnaniu, Turpin wziął sobie cały jego dobytek i córkę jak swoją własność. Barker w zemście zmienia nazwisko na Sweeney Todd (żeby uniknąć kolejnego procesu sądowego) i w swoim dawnym mieszkaniu nad jej zakładem otwiera nowy zakład fryzjerski, w którym podcina gardła niewinnym klientom, dokonując swej zemsty i przy okazji zaopatrując panią Lovett w nadzienie do pasztecików (bo dawno nie miała klientów). Tymczasem Anthony Hope, marynarz, który pomógł golibrodzie dostać się do Londynu, zakochuje się w Johannie. Jest to córka Benjamina, którą sędzia Turpin „przygarnął”. Obiecuje jej, że ją wykradnie. Raz Turpin przyszedł do Todda, żeby on go ogolił. Kiedy jednak zemsta się dopełnia, do pokoju wchodzi Anthony i wszystko idzie na marne. Drugi raz sędzia przychodzi nocą do Todda zwabiony listem z informacją o porwaniu Johanny przez Anthonego. Todd proponuje zabieg, a niczego niepodejrzewający sędzia z ochotą się zgadza.'
          rating={8.5}
        />
        <MovieBlock
          movieId='2'
          imgUrl='https://m.media-amazon.com/images/I/61z8BGnT0kL._AC_UF894,1000_QL80_.jpg'
          movieTitle='Edward Nożycoręki'
          movieDesc='Akwizytorka firmy Avon, Peg Boggs (Dianne Wiest), nie zdoławszy wiele zarobić w swoim rejonie, udaje się do ponurego zamczyska na wzgórzu, gdzie spotyka Edwarda (Johnny Depp). Edward to android, największe dzieło niedocenianego za życia wynalazcy (Vincent Price) mieszkającego kiedyś w zamku. Nagła śmierć przerwała wynalazcy pracę, w związku z czym Edward pozostał z ostrymi jak brzytwa nożycami zamiast dłoni. Pani Boggs zabiera Edwarda do swego domu, gdzie zaczyna się on powoli przystosowywać do życia w małomiasteczkowej społeczności. Zakochuje się w Kim Boggs (Winona Ryder), która na początku go nie cierpi, ale stopniowo zaczyna odwzajemniać jego uczucie, podczas gdy mieszkańcy miasteczka uprzedzają się do niego coraz bardziej, ze względu na jego niebezpieczne dla innych upośledzenie.'
          rating={7.7}
        />
      </div>
    </div>
  );
}
