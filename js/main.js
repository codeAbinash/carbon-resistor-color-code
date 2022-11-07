const getID = id => document.getElementById(id)

const toleranceColors = {
    "Blue": 0.25,
    "Brown": 1,
    "Red": 2,
    "Orange": 3,
    "Yellow": 4,
    "Green": 0.5,
    "Blue": 0.25,
    "Violet": 0.1,
    "Gray": 0.05,
    "Gold": 5,
    "Silver": 10,
    "unset": 20
}
const colors = {
    0: "Black", 1: "Brown",
    2: "Red", 3: "Orange",
    4: "Yellow", 5: "Green",
    6: "Blue", 7: "Violet",
    8: "Gray", 9: "White"
}

const band1 = getID('band1')
const band2 = getID('band2')
const band3 = getID('band3')
const band4 = getID('band4')
const unit = getID('unit')

const result = getID('result')
const minMax = getID('minMax')
const bands = document.querySelectorAll('.band')


const allInputs = [band1, band2, band3, band4, unit]


allInputs.forEach(elem => {
    elem.addEventListener('input', calculateResistance)
})



function calculateResistance() {
    const d1 = +band1.value
    const d2 = +band2.value
    const d3 = +band3.value
    const d4 = band4.value
    const u = +unit.value

    // Set colors of bands
    bands[0].style.backgroundColor = colors[d1]
    bands[1].style.backgroundColor = colors[d2]
    bands[2].style.backgroundColor = colors[d3]
    bands[3].style.backgroundColor = d4

    const tol = toleranceColors[d4]
    const resistance = (d1 * 10 + d2) * 10 ** d3

    const r = formatWithUnit(resistance)
    const maxVal = formatWithUnit(resistance + resistance * tol / 100)
    const minVal = formatWithUnit(resistance - resistance * tol / 100)


    result.textContent = r
    minMax.textContent = minVal + " to " + maxVal


    function formatWithUnit(resistance) {
        // 0 auto, 1 kh, 2 mh, 3 gh   
        switch (u) {
            case 0: return autoFormat(resistance)
            case 1: return resistance + "Ω"
            case 2: return resistance / 10 ** 3 + "KΩ"
            case 3: return resistance / 10 ** 6 + "MΩ"
            case 4: return resistance / 10 ** 9 + "GΩ"
        }

        function autoFormat(resistance) {
            if (resistance > 10 ** 10 - 1)
                return resistance / 10 ** 9 + "GΩ"
            else if (resistance > 10 ** 7 - 1)
                return resistance / 10 ** 6 + "MΩ"
            else if (resistance > 10 ** 4 - 1)
                return resistance / 10 ** 3 + "KΩ"
            else
                return resistance + "Ω"
        }
    }

}
