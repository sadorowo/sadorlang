method createperson(name, age, hobby) {
    return { name, age, hobby }
}

person! := createperson("Sador", 15, "IT")
printf("name: $0", at(person, 0))
printf("age: $0", at(person, 1))
printf("hobby: $0", at(person, 2))

bound method createITPerson(name, age) createperson(name, age, "IT")
itPerson! := createITPerson("Sador", 15)
printf("IT name: $0", at(itPerson, 0))
printf("IT age: $0", at(itPerson, 1))
printf("IT hobby (inherited from bound method, should be IT): $0", at(itPerson, 2))