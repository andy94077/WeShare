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
        print(result)

    def CheckIfEventCodeExists(self, code):
        assert re.match('[0-9a-zA-Z]{4}', code)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE eventCode=\'{code}\'')
        result = cursor.fetchall()
        return len(result) == 1

    def LoginWithToken(self, token):
        assert re.match('[0-9a-zA-Z]{8}', token)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM EventCodeMapping WHERE eventToken=\'{token}\'')
        result = cursor.fetchall()
        print(result)

    def CreateEvent(self, title = 'An Excellent Event'):
        assert len(title.encode('utf-8')) <= 255

        token = generateRandomString(length = 8)
        while True:
            code = generateRandomString(length = 4)
            if not self.CheckIfEventCodeExists(code):
                break

        # Write to `EventCodeMapping`
        cursor = self.db.cursor()
        cursor.execute(f'INSERT INTO EventCodeMapping (`eventCode`, `eventToken`, `eventName`) VALUES (\'{code}\', \'{token}\', \'{title}\')')
        self.db.commit()

        # TODO: Create event table
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

        # Remove event table
        cursor = self.db.cursor()
        cursor.execute()

        # Remove `EventCodeMapping` instance

    def GetAllPostsByCode(self, code, startID = 1):
        assert re.match('[0-9a-zA-Z]{4}', code)

        assert self.CheckIfEventCodeExists(code)

        cursor = self.db.cursor()
        cursor.execute(f'SELECT * FROM Event_{code} WHERE id >= {startID}')
        result = cursor.fetchall()
        return result

#  inputToken = input().strip()
#  LoginWithToken(inputToken)
sqlhelper = SQLHelper()

# test
def test1():
    print(sqlhelper.CheckIfEventCodeExists('1234'))
    print(sqlhelper.CheckIfEventCodeExists('3456'))
    print(sqlhelper.CheckIfEventCodeExists('5678'))
    sqlhelper.GetAllEventCodes()

def testCreate():
    print(sqlhelper.CreateEvent('PingChia'))
    sqlhelper.GetAllEventCodes()

testCreate()
