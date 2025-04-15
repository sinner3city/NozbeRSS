// MEMOIZATION JS

function memoize(fn) {
    const cache = new Map()

    return function (...args) {
        const key = JSON.stringify(args)

        if (cache.has(key)) {
            console.log("from cache")
            return cache.get(key)
        }

        const result = fn(...args)
        cache.set(key, result)
        return result
    }
}

// Przykłady użycia:
// const memoizedGroupByColumns = memoize(groupByColumns);
// console.log(memoizedGroupByColumns(SQL_DATA, ["month"], [aggrs.counter]));

// DEEP CLONING
// ==========================================================

export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
        return obj
    }
    const copyObj = (Array.isArray(obj) ? [] : {}) as Record<string, unknown>

    for (const key in obj) {
        // if (key !== "active") { // mozna dodac customowy warunek
        copyObj[key] = deepClone(obj[key])
        // }
    }

    return copyObj as T
}

// SEARCHING ARRAYS
// ==========================================================

// - LINEAR

export function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i
    }
    return -1
}

// - DEEP SEARCH

export function deepSearch<T>(obj: T, key: string, target: unknown, results = [] as T[]) {
    if (typeof obj !== "object" || obj === null) return results

    if (Array.isArray(obj)) {
        obj.forEach((item) => deepSearch(item, key, target, results))
    } else {
        if (obj[key] === target) {
            results.push(obj)
        }

        Object.values(obj).forEach((value) => {
            if (typeof value === "object" && value !== null) {
                deepSearch(value, key, target, results)
            }
        })
    }

    return results
}

export function deepFind(obj, target) {
    if (obj === target) return true

    if (typeof obj !== "object" || obj === null) return false

    if (Array.isArray(obj)) {
        for (const value of obj) {
            if (deepFind(value, target)) return true
        }
    } else {
        for (const key in obj) {
            if (deepFind(obj[key], target)) return true
        }
    }

    return false
}

// COMPARE ARRAYS
// ==========================================================

// - LINEAR

export function arraysEqual(a, b) {
    if (a === b) return true // te same referencje
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false
    }

    return true
}

// - LINEAR JSON.stringify

export function arraysEqualJson(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}

// -- DEEP EQUAL

export function deepEqual(a, b) {
    if (a === b) return true
    if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
        return false
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
            return false
        }
    }

    return true
}

// GET UNIQUE VALUES FROM ARRAY
// ==========================================================

export function mapUniqueValues(arr: []) {
    return [...new Map(arr.map((item) => [JSON.stringify(item), item])).values()]
}

// ---- DEEP UNIQUE ARRAY
export function uniqueArrObj<T>(arr: T[]) {
    const results: T[] = []

    for (const item of arr) {
        if (!results.some((duplicate) => deepEqual(duplicate, item))) {
            results.push(item)
        }
    }

    return results
}

// SORT ARRAYS WITHOUT .sort()
// ==========================================================

export function splitSearch(arr, target) {
    const chunk = 2

    for (let i = 0; i < arr.length; i += chunk) {
        const splited = [...arr].slice(i, i + chunk)
        for (let j = 0; j < splited.length; j++) {
            if (splited[j] === target) {
                return true
            }
        }
    }

    return false
}

export function sortManualy(arr: number[]) {
    const sorted = [...arr] // [40, 20, 3, 5]

    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i]
        let prev = i - 1

        while (prev >= 0 && sorted[prev] > current) {
            sorted[prev + 1] = sorted[prev]
            prev--
        }

        sorted[prev + 1] = current
    }

    return sorted
}

// Advance QuickSort and MergeSort
// =================================================================

// QuickSort

export function quickSort<T extends never>(arr: T[]): T[] {
    if (arr.length < 2) return arr

    const pivot = arr[arr.length - 1]
    const left = []
    const right = []

    console.log(pivot, "pivot")

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}

// MergeSort

export function mergeSort(arr) {
    if (arr.length <= 1) return arr

    const middle = Math.floor(arr.length / 2)
    const left = arr.slice(0, middle)
    const right = arr.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}

export function merge(left: [], right: []) {
    const result = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }

    return [...result, ...left.slice(i), ...right.slice(j)]
}

// CURRING EXAMPLE

// const addTax = (tax) => (price) => price * (tax / 100 + 1)
// const priceWithTax = addTax(23)

// console.log(priceWithTax(100))
