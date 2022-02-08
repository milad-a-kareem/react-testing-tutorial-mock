import { render, screen, waitFor } from '@testing-library/react';
import App from './App'


describe('Home component',()=>{
    const resolved = async()=>Promise.resolve({
        json: async()=>{ return Promise.resolve({
            features: [
                {
                    id:'001',
                    properties:{
                        place: 'test place',
                        mag: 0.5,
                        time: Date.now()
                    }
                }
            ]
        })}
    })


    test('when data is received the "test place" is on screen', async()=>{
        // arrange
        // window.fetch.mockResolvedValueOnce(resolved)
        window.fetch = jest.fn(resolved);
        render(<App/>)


        const hElement = await screen.findByText('test place',{}, {timeout: 3000} )
        expect(hElement).toBeInTheDocument()

    })

    test('when data is not received the "test place" is not on screen', async()=>{
        // arrange
        window.fetch.mockRejectedValueOnce('rejected')
        // window.fetch = jest.fn(()=>Promise.reject('rejected'));
        render(<App/>)

        await waitFor(()=>{
            expect(screen.queryByText('test place')).not.toBeInTheDocument()
        
        })
        expect(window.fetch).toBeCalledTimes(1)
        

    })
})