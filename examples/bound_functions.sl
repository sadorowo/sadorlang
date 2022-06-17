method createobject(type, name) {
    printf("created new $0 with name $1.", type, name)
}

bound method createdeveloper(name) createobject("developer", name)
createdeveloper("Sador")