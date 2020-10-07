import Head from 'next/head'
import {useState} from "react"
import Button from '@material-ui/core/Button'

export default function Home(data) {
    const [state, setState] = useState(data.data[0].source)
    const [request, setRequest] = useState(data.data)

    const clickButtonSubmit = async (event) => {
        event.preventDefault()
        const response  = await fetch('http://localhost:3000/api/data',
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(state)})
        const data = await response.json()
        setRequest(data)
    }
    console.log(request)
  return (
    <div>
      <Head>
        <title>Тестовое задание</title>
      </Head>
        <h1>{state}</h1>
        <form>
            <input
                type='text'
                defaultValue={state}
                onChange={event => setState (event.target.value)}
            />
            <input
                type='submit'
                onClick={(event)=>clickButtonSubmit(event)}
                value='Запросить'
            />
        </form>
        <pre>
            <p>{JSON.stringify(request[0],  null, '\t')}</p>
        </pre>
    </div>
  )
}
export async function getServerSideProps() {
    const response  = await fetch('http://localhost:3000/api/data')
    const data = await response.json()
    return {
        props: {data},
    }
}
