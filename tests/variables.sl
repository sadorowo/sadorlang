def val variable = { "a", "b", "c" }
each (key % variable) {
    def mut val ez = "hello"

    def mut val index = $IndexOf("$variable", "$key")
    def mut val value = $ItemAt("$variable", "$index")
    $Println("$index - $value")
}