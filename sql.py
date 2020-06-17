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
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE BINARY eventCode="{code}"')
        result = cursor.fetchall()
        return len(result) == 1

    def GetEventTitle(self, code):
        assert re.match('[0-9a-zA-Z]{4}', code)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE BINARY eventCode="{code}"')
        result = cursor.fetchall()
        if len(result) == 0:
            return None
        else:
            # returns event title
            return result[0][3]

    def LoginAsAdmin(self, token):
        assert re.match('[0-9a-zA-Z]{8}', token)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE BINARY eventToken="{token}"')
        result = cursor.fetchall()
        if len(result) == 0:
            return None
        else:
            # returns event code, event title
            return result[0][1], result[0][3]

    def CreateEvent(self, title = 'An Excellent Event'):
        # Returns a tuple of (code, token)
        assert len(title.encode('utf-8')) <= 255

        token = generateRandomString(length = 8)
        while True:
            code = generateRandomString(length = 4)
            if not self.CheckIfEventCodeExists(code):
                break

        # Write to `EventCodeMapping`
        cursor = self.db.cursor()
        query = 'INSERT INTO EventCodeMapping (`eventCode`, `eventToken`, `eventName`) VALUES (%(code)s, %(token)s, %(title)s)'
        cursor.execute(query, dict(code=code, token=token, title=title))
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
        assert re.match('[0-9a-zA-Z]{4}', code)

        cursor = self.db.cursor()

        try:
            # Remove event table
            cursor.execute(f'DROP TABLE Event_{code}')
        except:
            pass

        # Remove `EventCodeMapping` instance
        try:
            cursor.execute(f'DELETE FROM EventCodeMapping WHERE BINARY eventCode = "{code}"')
        except:
            pass

        self.db.commit()

    def GetPosts(self, code, startID = 1):
        assert re.match('[0-9a-zA-Z]{4}', code)

        assert self.CheckIfEventCodeExists(code)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM Event_{code} WHERE id >= {startID}')
        result = cursor.fetchall()
        return [r[1:] for r in result]

    def InsertPost(self, code, type, content):
        assert self.CheckIfEventCodeExists(code)

        assert type in ['text', 'link', 'image', 'file']
        
        cursor = self.db.cursor()
        query = f'INSERT INTO Event_{code} (type, content) VALUES (%(type)s, %(content)s)'
        cursor.execute(query, dict(type=type, content=content)
        self.db.commit()

#  inputToken = input().strip()
#  LoginWithToken(inputToken)
if __name__ == '__main__':
    sqlhelper = SQLHelper()
