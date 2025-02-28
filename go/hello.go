package main

//go:wasmexport add
func add(a int32, b int32) int32 {
	return a + b
}

func main() {}
