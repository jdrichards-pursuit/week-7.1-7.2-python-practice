class InstanceInfo:
    _instance = None  # Private class variable to store the instance

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.info = {}  # Initialize the dictionary property
        return cls._instance

    def set_info(self, key, value):
        self.info[key] = value  # Method to set information

    def get_info(self, key):
        return self.info.get(key)  # Method to get information
