export const tableTemp = {
    data1: mockData1(),
    data2: mockData2()
}

function mockData1() {
    let data = []
    for (let i = 0; i < 10; i++) {
        data.push({
            id: Number(Math.floor(i + 1)),
            name: 'Business' + Math.floor(Math.random () * 100 + 1),
            status: Math.floor(Math.random () * 3 + 1),
            time: Math.floor(Math.random () * 7 + 1),
            update: new Date()
        })
    }
    return data
}

function mockData2() {
    let data = []
    for (let i = 0; i < 10; i++) {
        data.push({
            id: Number(Math.floor(i + 20)),
            name: 'Life' + Math.floor(Math.random () * 100 + 1),
            status: Math.floor(Math.random () * 3 + 1),
            time: Math.floor(Math.random () * 7 + 1),
            update: new Date()
        })
    }
    return data
}