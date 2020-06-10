import re, random, string
import MySQLdb
import secret

def generateRandomString(length = 4):
    return ''.join(random.choices(string.ascii_letters + string.digits, k = length))

class SQLHelper:
    def __init__(self):
        self.db = MySQLdb.connect(
            host = secret.SQL_IP,
            user = secret.SQL_USERNAME,
            passwd = secret.SQL_PASSWORD,
            db = 'WeShare'
        )

    def GetAllEventCodes(self):
        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping')
        result = cursor.fetchall()
        result = [r[1] for r in result]
        return result

    def CheckIfEventCodeExists(self, code):
        assert re.match('[0-9a-zA-Z]{4}', code)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE eventCode="{code}"')
        result = cursor.fetchall()
        return len(result) == 1

    def LoginEventWithToken(self, token):
        assert re.match('[0-9a-zA-Z]{8}', token)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE eventToken="{token}"')
        result = cursor.fetchall()
        return None if len(result) == 0 else result[0]

    def CreateEvent(self, title = 'An Excellent Event'):
        assert len(title.encode('utf-8')) <= 255

        token = generateRandomString(length = 8)
        while True:
            code = generateRandomString(length = 4)
            if not self.CheckIfEventCodeExists(code):
                break

        # Write to `EventCodeMapping`
        cursor = self.db.cursor()
        cursor.execute(f'''
            INSERT INTO EventCodeMapping
                (`eventCode`, `eventToken`, `eventName`)
                VALUES ("{code}", "{token}", "{title}")
        ''')
        self.db.commit()

        # Create event table
        cursor = self.db.cursor()
        cursor.execute(f'''
            CREATE TABLE `Event_{code}` (
                id INT(64) NOT NULL AUTO_INCREMENT,
                time DATETIME NULL DEFAULT NOW(),
                type VARCHAR(15) NOT NULL,
                content VARCHAR(4095) NOT NULL,
                PRIMARY KEY (id));
        ''')
        self.db.commit()

        return code, token

    def RemoveEvent(self, code):
        raise NotImplementedError
        # TODO: in the future
        assert re.match('[0-9a-zA-Z]{4}', code)

        # Remove event table
        cursor = self.db.cursor()
        cursor.execute()

        # Remove `EventCodeMapping` instance

    def GetPosts(self, code, startID = 1):
        assert re.match('[0-9a-zA-Z]{4}', code)

        assert self.CheckIfEventCodeExists(code)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM Event_{code} WHERE id >= {startID}')
        result = cursor.fetchall()
        return result

    def InsertPost(self, code, type, content):
        assert self.CheckIfEventCodeExists(code)

        assert type in ['text', 'link', 'image', 'file']
        
        cursor = self.db.cursor()
        cursor.execute(f'''
            INSERT INTO Event_{code}
                (type, content)
                VALUES ("{type}", "{content}")
        ''');
        self.db.commit()

#  inputToken = input().strip()
#  LoginWithToken(inputToken)
if __name__ == '__main__':
    sqlhelper = SQLHelper()
