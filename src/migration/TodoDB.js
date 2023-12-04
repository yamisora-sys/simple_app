export const TodoDB = [
    {
        tableName: "List",
        fields: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, created_at TEXT, updated_at TEXT"
    },
    {
        tableName: "Setting",
        fields: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER"
    },
]

export const TodoDBData = [
    {
        tableName: "Setting",
        fields: "name, value",
        data: [
            {
                name:"darkmode",
                value: 0
            },
            {
                name: "fontsize",
                value: 12
            }
        ]
    }
]
