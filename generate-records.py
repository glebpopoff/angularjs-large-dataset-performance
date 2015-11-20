import string
import random
import datetime
import json
import sys

alphabet = 'abcdefghijklmnopqrstuvwyxz'
states = ['AL','AR','AZ','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
companies = ['Google', 'IBM', 'Match', 'Primacy', 'Amazon', 'Yahoo', 'Twitter', 'Facebook', 'Dell', 'Apple', 'Samsung', 'Meetup', 'Firefox', 'Uber', 'AirBNB', 'GM', 'Slack', 'Spotify', 'Hilton', 'Marriot', '3M', 'Walmart', 'S&S', 'CVS', 'Walgreens', 'Sitecore', 'Oracle', 'Microsoft', 'Zend', 'Alphabet']
data_file = './data-file.json'
time_started = datetime.datetime.utcnow()
totalRecords = 1000 if not sys.argv else int(sys.argv[1])
data = ''
 
class Customer:
	id = ''
	firstName = ''
	lastName = ''
	email = ''
	company = ''
	phone = ''
	state = ''
	def to_JSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
        	sort_keys=True, indent=2)

print str(time_started) + ' - Generating Data (' + str(totalRecords) + ' records)..'

for i in range(totalRecords):
	#create new customer record
	c = Customer()
	c.id = i+1
	#randomly generate first,last,phone fields
	c.firstName = ''.join([random.choice(alphabet) for _ in range(5)]).capitalize()
	c.lastName = ''.join([random.choice(alphabet) for _ in range(7)]).capitalize()
	c.phone = ''.join(str(random.randint(1,9)) for _ in xrange(3)) + '-' + ''.join(str(random.randint(1,9)) for _ in xrange(3)) + '-' + ''.join(str(random.randint(1,9)) for _ in xrange(4))
	#randomly pick company and state
	c.company = random.choice(companies)
	c.state = random.choice(states)
	c.email = c.firstName + '.' + c.lastName + '@' + c.company + '.com'
	#add the record  (in JSON format) to the data string
	data += c.to_JSON() + ','
time_io = datetime.datetime.utcnow()

print str(time_io) + ' - Writing data to file ' + data_file
file = open(data_file, 'w')
file.write('[' + data[:-1] + ']')
file.close()
time_ended = datetime.datetime.utcnow()
print str(time_ended) + ' - Done!'
print 'Total time: ' + str(time_ended - time_started)