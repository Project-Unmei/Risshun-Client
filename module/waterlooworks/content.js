// WaterlooWorks Module

// Module Lead  - Leo Chai (TheLeoChai)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "WaterlooWorks";



(() => {
    chrome.runtime.onMessage.addListener((request, sender, response) => {
        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);
        const { type } = request;


        if (type === "NEW") {
            console.log(`${extName} Extension received NEW Message.`);

            const cont_aaaa = document.getElementsByClassName('aaaa')[0];
            const cont_postingDiv = document.getElementById('postingDiv');

            // tab loaded is job-posting-list
            if (cont_aaaa) {
                console.log('coop posting list loaded');
                addCheckBoxes();
            }

            // tab loaded is job-posting
            else if (cont_postingDiv) {
                console.log('coop job posting loaded');
                addGenButton();
            }
        }
    });

    const addCheckBoxes = () => {
        const checkBoxes = document.getElementsByClassName('CovGenCheckbox')[0];
        if(checkBoxes) return;

        let postingTableDiv = document.getElementById('postingsTableDiv');
        let postingTable = postingTableDiv.getElementsByClassName('table')[0];
        let postingTableThread = postingTable.getElementsByTagName('thead')[0];

        let postingTableThreadRow = postingTableThread.getElementsByTagName('tr')[0];

        let newThreadHead = document.createElement('th');
        let newButton = document.createElement('a');
        newButton.innerHTML = 'Generate CL';

        newButton.classList.add('btn');
        newButton.classList.add('btn-primary');
        newButton.classList.add('btn-small');
        newButton.style = 'font-weight: normal;';

        newThreadHead.appendChild(newButton);
        postingTableThreadRow.insertBefore(newThreadHead, postingTableThreadRow.firstChild);

        let postingTableBody = postingTable.getElementsByTagName('tbody')[0];

        for (child of postingTableBody.children) {
            let newThreadData = document.createElement('td');
            let newCheckBox = document.createElement('input');

            newCheckBox.type = 'checkbox';
            newCheckBox.className = 'CovGenCheckbox';

            newThreadData.appendChild(newCheckBox);
            child.insertBefore(newThreadData, child.firstChild);
        }

    }

    const addGenButton = () => {
        const checkGenButton = document.getElementById('postingsTableDiv');
        if(checkGenButton) return;

        let dashboardHeader = document.getElementsByClassName('dashboard-header__profile-information')[0];
        let dashboardHeaderDiv = dashboardHeader.getElementsByTagName('div')[0];

        let newButton = document.createElement('button');
        newButton.innerHTML = 'Generate Cover Letter';
        newButton.id = 'CVGenButton';
        newButton.classList.add('btn__default--text');
        newButton.classList.add('btn--default');
        newButton.type = 'button';
        //newButton.setAttribute('onClick', 'javascript: GenerateCoverLetter()');

        newButton.onclick = function() {
            console.log('button clicked');

            let JobPostingInformation = [   "Work Term:", 
                                            "Job Type:", 
                                            "Job Title:",
                                            "Number of Job Openings:", 
                                            "Job Category (NOC):", 
                                            "Level:", 
                                            "Region:", 
                                            "Job - Address Line One:", 
                                            "Job - Address Line Two:",
                                            "Job - City:",
                                            "Job - Province / State:",
                                            "Job - Postal Code / Zip Code (X#X #X#):",
                                            "Job - Country:",
                                            "Work Term Duration:",
                                            "Special Job Requirements:",
                                            "Job Summary:",
                                            "Job Responsibilities:",
                                            "Required Skills:",
                                            "Compensation and Benefits Information:",
                                            "Targeted Degrees and Disciplines:"];            



            var data = {
                "UID": "",
                "TYPE": "gpt",
                "DATA": {
                    "TITLE": "",
                    "COMPANY": "",
                    "JOB_SUM": "",
                    "JOB_RESP": "",
                    "JOB_SKILL": ""
                },
                "WorkTerm": "",
                "JobType": "",
                "JobTitle": "",
                "Openings": "",
                "Category": "",
                "Level": "",
                "Region": "",
                "Address1": "",
                "Address2": "",
                "City": "",
                "Province": "",
                "PostalCode": "",
                "Country": "",
                "Duration": "",
                "Requirements": "",
                "Summary": "",
                "Responsibilities": "",
                "Skills": "",
                "Compensation": "",
                "Degrees": "",
                "Position": "",
                "Company": "",
            };

            let JobPostingInformationBody = document.getElementsByClassName('panel-body')[0];
            let JobPostingInformationTable = JobPostingInformationBody.children[0];
            let JobPostingInformationTableBody = JobPostingInformationTable.children[0];
            let JobPostingInformationTableRows = JobPostingInformationTableBody.children;

            for (child of JobPostingInformationTableRows) {
                let childField = child.getElementsByTagName('td')[0].children[0].innerHTML.trim();;
                let childValue = "";
                console.log(childField);
                if (childField.includes("Level:")) {

                    let childTbody = child.getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

                    for(miniChild of childTbody.children) childValue = childValue + miniChild.children[0].innerHTML + " ";

                } else if (childField.includes("Work Term:")) {
                    childValue = child.getElementsByTagName('td')[1].innerHTML;
                }
                else {
                    childValue = child.getElementsByTagName('td')[1].children[0].innerHTML;
                }
                childValue = childValue.replace(/<[^<>]*>/g, "");
                childValue = childValue.replace(/[\r\n\t]/g, "");
                childValue = childValue.replace(/&nbsp;/g, "");
                childValue = childValue.trim();
                console.log(childValue);

                switch (childField) {
                    case "Work Term:":
                        data.WorkTerm = childValue;
                        break;
                    case "Job Type:":
                        data.JobType = childValue;
                        break;
                    case "Job Title:":
                        data.JobTitle = childValue;
                        break;
                    case "Number of Job Openings:":
                        data.Openings = childValue;
                        break;
                    case "Job Category (NOC):":
                        data.Category = childValue;
                        break;
                    case "Level:":
                        data.Level = childValue;
                        break;
                    case "Region:":
                        data.Region = childValue;
                        break;
                    case "Job - Address Line One:":
                        data.Address1 = childValue;
                        break;
                    case "Job - Address Line Two:":
                        data.Address2 = childValue;
                        break;
                    case "Job - City:":
                        data.City = childValue;
                        break;
                    case "Job - Province / State:":
                        data.Province = childValue;
                        break;
                    case "Job - Postal Code / Zip Code (X#X #X#):":
                        data.PostalCode = childValue;
                        break;
                    case "Job - Country:":
                        data.Country = childValue;
                        break;
                    case "Work Term Duration:":
                        data.Duration = childValue;
                        break;
                    case "Special Job Requirements:":
                        data.Requirements = childValue;
                        break;
                    case "Job Summary:":
                        data.Summary = childValue;
                        break;
                    case "Job Responsibilities:":
                        data.Responsibilities = childValue;
                        break;
                    case "Required Skills:":
                        data.Skills = childValue;
                        break;
                    case "Compensation and Benefits Information:":
                        data.Compensation = childValue;
                        break;
                    case "Targeted Degrees and Disciplines:":
                        data.Degrees = childValue;
                        break;
                }
            }

            
            // Fetching main block of WaterlooWorks Content
            let dashboardHeader = document.getElementsByClassName('dashboard-header__profile-information')[0];
            let dashboardHeaderH1 = dashboardHeader.getElementsByTagName('h1')[0].innerHTML;
            let dashboardHeaderH2 = dashboardHeader.getElementsByTagName('h2')[0].innerHTML;

            dashboardHeaderH1 = dashboardHeaderH1.replace(/[\r\n\t]/g, "");
            dashboardHeaderH2 = dashboardHeaderH2.replace(/[\r\n\t]/g, "");

            data.UID = dashboardHeaderH1.substring(0, dashboardHeaderH1.indexOf('-')).trim();
            data.Position = dashboardHeaderH1.substring(dashboardHeaderH1.indexOf('-') + 1).trim().split(',')[0].split(' - ')[0].split('/')[0];
            data.Company = dashboardHeaderH2.substring(0, dashboardHeaderH2.indexOf(' - ')).trim();
            
            data.DATA.TITLE = data.Position;
            data.DATA.COMPANY = data.Company;
            data.DATA.JOB_SUM = data.Summary;
            data.DATA.JOB_RESP = data.Responsibilities;
            data.DATA.JOB_SKILL = data.Skills;

            console.log(data.Position);
            console.log(data.Company);

            format_and_send_data(data);
        };

        dashboardHeaderDiv.appendChild(newButton);
    }

    
})();
