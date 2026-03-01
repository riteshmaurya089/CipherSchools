require('dotenv').config();

const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');
const { MONGO_URI } = require('./config/envconfig');

// ----------------- Sample Assignments -----------------
const sampleAssignments = [
  // EASY
  {
    title: "Basic SELECT Query",
    difficulty: "Easy",
    description: "Learn to retrieve data from a single table using SELECT statements",
    question: "Write a query to select all columns from the 'employees' table where the salary is greater than 50000.",
    tables: [
      {
        tableName: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" },
          { name: "hire_date", type: "DATE" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000, hire_date: "2020-01-15" },
          { id: 2, name: "Jane Smith", department: "Marketing", salary: 45000, hire_date: "2021-03-20" },
          { id: 3, name: "Bob Johnson", department: "Engineering", salary: 82000, hire_date: "2019-07-10" },
          { id: 4, name: "Alice Williams", department: "HR", salary: 55000, hire_date: "2022-02-01" }
        ]
      }
    ],
    expectedColumns: ["id", "name", "department", "salary", "hire_date"]
  },

  
  // MEDIUM
  {
    title: "JOIN Operations",
    difficulty: "Medium",
    description: "Practice combining data from multiple tables using JOIN clauses",
    question: "Write a query to display employee names along with their department names by joining the employees and departments tables.",
    tables: [
      {
        tableName: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "dept_id", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", dept_id: 1 },
          { id: 2, name: "Jane Smith", dept_id: 2 },
          { id: 3, name: "Bob Johnson", dept_id: 1 }
        ]
      },
      {
        tableName: "departments",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "dept_name", type: "VARCHAR(50)" }
        ],
        sampleData: [
          { id: 1, dept_name: "Engineering" },
          { id: 2, dept_name: "Marketing" },
          { id: 3, dept_name: "HR" }
        ]
      }
    ],
    expectedColumns: ["name", "dept_name"]
  },

  {
    title: "Aggregate Functions",
    difficulty: "Medium",
    description: "Master GROUP BY and aggregate functions like COUNT, SUM, AVG",
    question: "Write a query to find the average salary for each department, showing department name and average salary.",
    tables: [
      {
        tableName: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000 },
          { id: 2, name: "Jane Smith", department: "Marketing", salary: 45000 },
          { id: 3, name: "Bob Johnson", department: "Engineering", salary: 82000 },
          { id: 4, name: "Alice Williams", department: "HR", salary: 55000 },
          { id: 5, name: "Charlie Brown", department: "Marketing", salary: 48000 }
        ]
      }
    ],
    expectedColumns: ["department", "avg_salary"]
  },

  // HARD
  {
    title: "Subqueries and Filtering",
    difficulty: "Hard",
    description: "Use subqueries to filter complex datasets",
    question: "Write a query to find employees whose salary is greater than the average salary of their department.",
    tables: [
      {
        tableName: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000 },
          { id: 2, name: "Jane Smith", department: "Engineering", salary: 65000 },
          { id: 3, name: "Alice Williams", department: "HR", salary: 55000 },
          { id: 4, name: "Bob Johnson", department: "HR", salary: 50000 }
        ]
      }
    ],
    expectedColumns: ["name", "department", "salary"]
  },

  {
    title: "Multiple Table Joins",
    difficulty: "Hard",
    description: "Complex join queries across multiple tables",
    question: "Write a query to display each order along with the customer name and product name.",
    tables: [
      {
        tableName: "customers",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" }
        ],
        sampleData: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" }
        ]
      },
      {
        tableName: "orders",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "customer_id", type: "INTEGER" },
          { name: "product", type: "VARCHAR(100)" },
          { name: "amount", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, customer_id: 1, product: "Laptop", amount: 1200 },
          { id: 2, customer_id: 2, product: "Monitor", amount: 300 }
        ]
      }
    ],
    expectedColumns: ["name", "product", "amount"]
  }
];

// ----------------- Connect & Seed -----------------
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await Assignment.deleteMany({});
    console.log("Old assignments deleted 🗑️");
    await Assignment.insertMany(sampleAssignments);
    console.log("New assignments seeded successfully 🎉");
    process.exit();
  })
  .catch(err => {
    console.error("SEED ERROR ❌", err);
    process.exit(1);
  });