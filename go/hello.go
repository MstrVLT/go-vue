package main

import "fmt"

//go:wasmexport add
func add(a int32, b int32) int32 {
	return a + b
}

func main() {
	const max = 100000000
	for i := 0; i < max; i++ {
		if i%(max/10) == 0 {
			fmt.Println(i)
		}
	}
}
