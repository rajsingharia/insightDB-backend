
type RequiredCredentials = {
    name: string;
    type: string;
    description: string;
    required: boolean;
}

type Integration = {
    id: number;
    type: string;
    name: string;
    icon?: string;
    requiredCredentials?: Array<RequiredCredentials>;
    group?: string;
}

export const ListOfSupportedIntegrations: Array<Integration> = [
    {
        id: 1,
        type: "postgres",
        name: "Postgres QL",
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968342.png",
        group: "Database",
        requiredCredentials: [
            {
                name: "host",
                type: "string",
                description: "Host of the database",
                required: true
            },
            {
                name: "database",
                type: "string",
                description: "Name of the database",
                required: true
            },
            {
                name: "port",
                type: "number",
                description: "Port of the database",
                required: true
            },
            {
                name: "username",
                type: "string",
                description: "Username in the database",
                required: true
            },
            {
                name: "password",
                type: "password",
                description: "Password of the user",
                required: true
            }
        ]
    },
    {
        id: 2,
        type: "mongodb",
        name: "Mongo DB",
        icon: "https://static-00.iconduck.com/assets.00/mongodb-icon-2048x2048-cezvpn3f.png",
        group: "Database",
        requiredCredentials: [
            {
                name: "server",
                type: "string",
                description: "Server of the database",
                required: true
            },
            {
                name: "port",
                type: "number",
                description: "Port of the database",
                required: true
            },
            {
                name: "database",
                type: "string",
                description: "Name of the database",
                required: true
            },
            {
                name: "username",
                type: "string",
                description: "Username in the database",
                required: false
            },
            {
                name: "password",
                type: "password",
                description: "Password of the user",
                required: false
            }
        ]
    },
    {
        id: 3,
        type: "mysql",
        name: "MySQL",
        icon: "https://cdn4.iconfinder.com/data/icons/logos-3/181/MySQL-512.png",
        group: "Database",
    },
    {
        id: 5,
        type: "oracle",
        name: "Oracle",
        icon: "https://1.bp.blogspot.com/-olEGUVAbDOg/YS_VDSoSMFI/AAAAAAAAL5k/avUIQTjd2dkflGsbVp8wxIueT8HhMklIgCLcBGAsYHQ/s0/oracle-db.png",
        group: "Database",
    },
    {
        id: 6,
        type: "cassandra",
        name: "Cassandra",
        icon: "https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_200,h_200/https://api.charmhub.io/api/v1/media/download/charm_nwYyQPOuk1TkBzmKxWObtvzygxT4YXWh_icon_737a810ab4f3b82b805cce1190e3495ef08c4bc457f7c8b52ff1c54055638927.png",
        group: "Database",
    },
    {
        id: 7,
        type: "dynamodb",
        name: "DynamoDB",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png",
        group: "Database",
    },
    {
        id: 8,
        type: "elasticsearch",
        name: "Elasticsearch",
        icon: "https://cdn.iconscout.com/icon/free/png-256/free-elasticsearch-226094.png",
        group: "Database",
    },
    {
        id: 9,
        type: "redis",
        name: "Redis",
        icon: "https://cdn.iconscout.com/icon/free/png-256/free-redis-83994.png",
        group: "Database",
    },
    {
        id: 10,
        type: "kafka",
        name: "Kafka",
        icon: "https://cdn.confluent.io/wp-content/uploads/apache-kafka-icon-2021-e1638496305992.jpg",
        group: "Database",
    },
    {
        id: 11,
        type: "rabbitmq",
        name: "RabbitMQ",
        icon: "https://static-00.iconduck.com/assets.00/rabbitmq-icon-484x512-s9lfaapn.png",
        group: "Database",
    },
    {
        id: 12,
        type: "restApi",
        name: "Rest Api",
        icon: "https://lordicon.com/icons/wired/flat/1330-rest-api.svg",
        group: "Other",
        requiredCredentials: [
            {
                name: "baseUrl",
                type: "string",
                description: "",
                required: true
            }
        ]
    },
    {
        id: 13,
        type: "offline",
        name: "Offline",
        icon: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
        group: "Other",
        requiredCredentials: [
            {
                name: "data",
                type: "string",
                description: "",
                required: true
            },
            {
                name: "type",
                type: "string",
                description: "",
                required: true
            }
        ]
    }
]


export const SupportedCharts = [
    {
        id: 1,
        icon: 'https://cdn-icons-png.flaticon.com/512/404/404621.png',
        name: 'Time Bar Chart',
        value: 'timeBar'
    },
    {
        id: 2,
        icon: 'https://cdn-icons-png.flaticon.com/512/3815/3815321.png',
        name: 'Line Chart',
        value: 'line'
    },
    {
        id: 3,
        icon: 'https://cdn-icons-png.flaticon.com/512/3589/3589902.png',
        name: 'Pie Chart',
        value: 'pie'
    },
    {
        id: 4,
        icon: 'https://cdn-icons-png.flaticon.com/512/7665/7665284.png',
        name: 'Scatter Chart',
        value: 'scatter'
    },
    {
        id: 5,
        icon: 'https://cdn-icons-png.flaticon.com/512/425/425064.png',
        name: 'Area Chart',
        value: 'area'
    },
    {
        id: 6,
        icon: 'https://cdn-icons-png.flaticon.com/512/3815/3815321.png',
        name: 'Stacked Area Chart',
        value: 'stackedArea'
    },
    {
        id: 7,
        icon: 'https://cdn-icons-png.flaticon.com/512/3815/3815321.png',
        name: 'Stacked Bar Chart',
        value: 'stackedBar'
    }
]