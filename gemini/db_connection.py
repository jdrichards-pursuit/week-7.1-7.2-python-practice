import sqlite3
# Create a singleton class for the database connection
class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.conn = sqlite3.connect('gem_chat.db')
            cls._instance.cursor = cls._instance.conn.cursor()
        return cls._instance

    def execute_query(self, query, params=None):
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            self.conn.commit()
        except Exception as e:
            print(f"Error executing SQL query: {e}")

    def fetch_all_rows(self, table_name):
        self.cursor.execute(f'SELECT * FROM {table_name}')
        return self.cursor.fetchall()

    def close_connection(self):
        self.conn.close()