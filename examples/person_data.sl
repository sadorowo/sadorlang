sador := { imie: "Franek", wiek: 15, zainteresowania: { "IT", "Sport" } } as dict

each(entries(sador) { |param| ->
    key := at(param, 0)
    val := at(param, 1)

    printf("Parametr $0 obiektu <sador> jest rowny $1" key val)
})