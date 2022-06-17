# SadorLang

1. Install NodeJS
2. Install

- Windows
```powershell
iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/sadorowo/sadorlang/main/installer.ps1'))
```

- Linux
```shell
git clone https://github.com/sadorowo/sadorlang
```

3. Run

- Windows
```shell
.\sl run <file>
```

- Linux
```shell
chmod +x ./sl.sh
./sl.sh
```

done :)

# Examples
1. Bound function usage
```cs
method createPerson(name, age, hobby) {
    return { name, age, hobby } as dict
}

/*
tip: variable! := "abc"
when we will try using tip > "def"
error!!!
variable! = constant 
*/

personNotInterestedInIT! := createPerson("Marek", 420, "69 😏")
printf("name: $0", at(personNotInterestedInIT, 0))
printf("age: $0", at(personNotInterestedInIT, 1))
printf("hobby: $0", at(personNotInterestedInIT, 2))

/*
should be
name: Marek
age: 420
hobby: 69 😏
*/

// We can use bound method in this case.
bound method createPersonInterestedInIT(name, age) createPerson(name, age, "IT")
// Let's create person interested in IT.
personInterestedInIT! := createPersonInterestedInIT("Sador", 2137)
printf("name: $0", at(personInterestedInIT, 0))
printf("age: $0", at(personInterestedInIT, 1))
printf("hobby: $0", at(personInterestedInIT, 2))

/*
should be
name: Sador
age: 2137
hobby: IT (inherited from bound method)
*/

```

2. Constants
```cs
static_variable! := "hello world"

// ! = const

static_variable > "goodbye world"
// error
```

3. Dicts
```cs
dict := { sador: king } as dict

each(entries(dict), { |item| ->
    key := at(item, 0)
    val := at(item, 1)

    printf("$0 is $1", key, val)
})
```

4. Girlfriend generator
```cs
boy := "somebody"
girl := "anybody"

// ah yes
persons := { "csgo", "league of retards", "minecraft", "nobody 😅" }
girl > random(persons)

printf("From now $0's girlfriend is $1", boy, girl)
```

created using **moo** and **nearley**