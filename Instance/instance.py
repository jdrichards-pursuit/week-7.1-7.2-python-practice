class InstanceInfo:
    _instance = None  # Private class variable to store the instance

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.info = {}  # Initialize the dictionary property
            cls._instance.session_time = None
        return cls._instance

    def set_info(self, key, value, session_time=None):  # Add default value for session_time
        if key and value is not None:
            self.info[key] = value  # Method to set information
        #for session persistence
        if not key and not value: self.session_time = session_time

    def get_info(self, key):
        return self.info.get(key)  # Method to get information
    
    def get_session_time(self):
        return self.session_time
