dict := <dict>{ sador: king }

each(entries(dict) { |item|
    key := at(item 0)
    val := at(item 1)

    print(key "to" val)
})