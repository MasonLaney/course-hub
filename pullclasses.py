import time
from bs4 import BeautifulSoup
import lxml
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import json 


## send post with user/pw
## get post back with json object
def pullClasses(username, password): 
    assignmentResults = {} 
    assignmentResults['Schedule'] = getClassTimes(username, password, assignmentResults, driver)
    assignmentResults['Classes'] = getSakaiAssignments(username, password, assignmentResults, driver)
    ## post back 
    #jsonResult = jsonify(assignnmentResults)
    jsonResult = json.dumps(assignmentResults)
    return jsonResult 

def getClassTimes(username , password, assignmentResults, driver): 
    driver.get('https://connectcarolina.unc.edu/')
    #time.sleep(0.75)

    # get to login page
    login = driver.find_element_by_class_name("button-header")
    login.click()

    # login 
    time.sleep(3)
    email = driver.find_element_by_id("username")
    passwordLogin = driver.find_element_by_id("password")
    ## your login
    email.send_keys(username)
    ## your password
    passwordLogin.send_keys(password)
    login = driver.find_element_by_name("_eventId_proceed")
    login.click()
    time.sleep(3)

    # go to student center 
    login = driver.find_element_by_id("win0divPTNUI_LAND_REC_GROUPLET$2")
    login.click()
    time.sleep(3)

    #driver.quit()
    # switch to actual content 
    iframe = driver.find_element_by_name("TargetContent")
    driver.switch_to_frame(iframe)
    #open = driver.find_element_by_name("DERIVED_SSS_SCL_SS_WEEKLY_SCHEDULE")
    #open.click()

    html = driver.page_source
    sec_soup = BeautifulSoup(html)
    times = [] 
    classes = []
    classTuples = [] 
    for span in sec_soup.select(".PSLONGEDITBOX"):
        if "PM" in span.text or "AM" in span.text:
            s = span.text
            s = s.split("\n")
            newS = "" 
            for i in s: 
                if "Room" not in i: 
                    newS = newS + " " + i
            #print(newS)
            times.append(newS)
    for span in sec_soup.select(".PSHYPERLINKDISABLED"):
        s = span.text
        s = s.split("\n")[0]
        classes.append(s)
    for i in range(len(times)): 
        tuple = {}
        tuple['class'] = classes[i]
        tuple['time'] = times[i]
        classTuples.append(tuple)
    return classTuples 


def getSakaiAssignments(username, password, assignmentResults, driver): 
    driver.get('https://sakai.unc.edu/')

    loginClick = driver.find_element_by_id("login_btn1")
    loginClick.click() 

    time.sleep(3)
    email = driver.find_element_by_id("username")
    passwordLogin = driver.find_element_by_id("password")
    ## your login
    email.send_keys(username)
    ## your password
    passwordLogin.send_keys(password)
    login = driver.find_element_by_name("_eventId_proceed")
    login.click()
    #time.sleep(5)
    ## need to grab all classes
    #comp311 = driver.find_element_by_link_text("COMP311.001.FA20")
    #comp311.click() 
    # 
    classes = driver.find_elements_by_class_name("link-container")
    classLinks = {}
    for i in classes:
        c = i.get_attribute('title')
        if 'FA20' in c: 
            temp = c.split(".")[0]
            #print(temp)
            classLinks[temp] = i.get_attribute('href')
    assignmentResultsT = {}
    for i in classLinks: 
        assignmentResultsT[i] = getAssignmentsForClass(classLinks[i], driver)

    return assignmentResultsT


def getAssignmentsForClass(url, driver): 
    driver.get(url)
    time.sleep(3)
    links = driver.find_elements_by_class_name("Mrphs-toolsNav__menuitem--link ")
    assignmentPage = False
    for link in links: 
        if "assignment" in link.get_attribute("title"):
            assignmentPage = True
            link.click()
            break
    if not assignmentPage:
        return
    assignments = [] 
    html = driver.page_source
    sec_soup = BeautifulSoup(html)
    links = [] 
    for span in sec_soup.select('a[name="asnActionLink"]'):
        links.append(span.get("href"))
    titles = [] 
    for span in sec_soup.select('a[name="asnActionLink"]'):
        titles.append(span.get("title"))

    status = [] 
    for span in sec_soup.select('td[headers="status"]'):
        s = span.text
        s = s.replace("\t","")
        s = s.replace("\n","")
        status.append(s)

    opens = []   
    for span in sec_soup.select('td[headers="openDate"]'):
        s = span.text
        s = s.replace("\t","")
        s = s.replace("\n","")
        s = s.replace(",","")
        s = s.replace(" AM","AM")
        s = s.replace(" PM","PM")
        date_time_str = 'Jun 28 2018 7:40AM'
        date_time_obj = datetime.datetime.strptime(s, '%b %d %Y %I:%M%p')
        #print(date_time_obj)

        opens.append(date_time_obj)
    due = [] 
    for span in sec_soup.select('td[headers="dueDate"]'):
        try: 
            s = span.text
            s = s.replace("\t","")
            s = s.replace("\n","")
            s = s.replace(",","")
            s = s.replace(" AM","AM")
            s = s.replace(" PM","PM")
            date_time_obj = datetime.datetime.strptime(s, '%b %d %Y %I:%M%p')
            due.append(date_time_obj)
        except: 
            due.append("")
    
    for i in range(len(status)): 
        assignmentObj = {} 
        assignmentObj['Status'] = status[i]
        assignmentObj['Title'] = titles[i]
        assignmentObj['Open'] = opens[i]
        assignmentObj['Due'] = due[i]
        assignmentObj['Link'] = links[i]
        assignments.append(assignmentObj)
    return assignments