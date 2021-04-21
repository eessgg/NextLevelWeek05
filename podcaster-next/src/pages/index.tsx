

export default function Home(props) {
  console.log(props.episodes)
  return (
    <>
      <h1>HOME</h1>
    </>
  )
}


export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }
}