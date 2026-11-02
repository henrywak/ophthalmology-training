/* Office-specific cross-training. Keep location insurance references with the trainer. */
window.createFrontDeskModules = function () {
  'use strict';
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function p(s) { return '<p>' + s + '</p>'; }
  function list(a) { return '<ul>' + a.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>'; }
  function steps(a) { return '<ol>' + a.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>'; }
  function section(t, s) { return '<h3 class="m-sec">' + t + '</h3>' + s; }
  function box(t, s, kind) { return '<div class="callout callout--' + (kind || 'key') + '"><h4 class="callout__title">' + t + '</h4>' + s + '</div>'; }
  function say(s) { return '<blockquote class="q-good">' + s + '</blockquote>'; }
  function reveal(t, s) { return '<details class="reveal"><summary>' + t + '</summary>' + s + '</details>'; }
  function quiz(stem, answers, correct, feedback) {
    return '<div class="q"><p class="q__stem">' + stem + '</p>' + answers.map(function (a, i) {
      return '<button class="opt" data-correct="' + (i === correct ? '1' : '0') + '" data-fb="' + esc(i === correct ? feedback : 'Review the decision in this lesson, then try again.') + '">' + a + '</button>';
    }).join('') + '<p class="q__fb" aria-live="polite"></p></div>';
  }
  function lesson(num, title, topic, goal, content, practice, check) {
    return {num: num, title: title, topic: topic, body: '<p class="lead">' + goal + '</p>' + content + section('Practice with your trainer', p(practice)) + box('Ready to continue', p(check), 'check')};
  }
  function module(id, n, title, desc, objectives, lessons) {
    return {id: id, label: 'Module ' + n, title: title, status: 'available', desc: desc,
      overview: '<p class="lead">' + desc + '</p>' + box('Learning objectives', list(objectives)) +
        section('How to learn this module', steps(['Read one lesson.', 'Watch your trainer demonstrate the task using a fictional or approved training record.', 'Practice that task with your trainer.', 'Repeat the call from the beginning, adding the new skill.'])) +
        box('Trainer preparation', p('Use this office workflow with your location’s current insurance/IPA acceptance reference, portal access, doctor schedule, and referral requirements. Demonstrate Nextech in person; only confirmed navigation is specified here. Use fictional patient details for practice. Course progress records lesson completion on this device; it does not establish permission to work independently.'), 'check'), lessons: lessons};
  }
  var close = 'Confirm the appointment date, time, and doctor. Remind the patient to bring ID, insurance cards, a Medicare card if they have Medicare, their eye-drop medications, and a current medication list.';
  var urgent = steps([
    'Recognize flashes, sudden vision loss, a curtain/shadow/veil in vision, or severe eye pain. Pause routine scheduling and escalate promptly; do not diagnose or reassure the caller that it is safe to wait.',
    'Ask the tech lead whether the patient can be accommodated today. If the lead is unavailable, ask the doctor. Obtain approval before adding the patient.',
    'For an existing patient, confirm whether insurance has changed so the office can address authorization requirements. Keep clinical escalation active while administrative questions are resolved.',
    'If the patient cannot be accommodated, or changed insurance prevents this office from seeing them, relay the office instruction: patients experiencing severe eye pain or visual disturbance should go to the ER for treatment ASAP. Do not tell them to wait for worsening.',
    'The earliest available opening is the office’s next scheduling option when same-day accommodation is declined. It does not replace the immediate-care instruction for severe pain or visual disturbance.'
  ]);
  return [
    module('fd-foundations-v1', 1, 'Phone Foundations & Patient Lookup',
      'Begin with listening, urgent-symptom recognition, and finding the right Nextech record. You already have clinical experience; this module connects it to the front-desk role.',
      ['Open a call clearly and identify the request.', 'Recognize an urgent call before ordinary scheduling.', 'Route records, surgery, and out-of-scope requests.', 'Search before creating a patient profile.'], [
      lesson('1.1', 'Open the Call & Identify the Request', 'Listen before choosing a workflow',
        'Your first task is to understand what the caller needs.',
        say('“Hi, this is [ophthalmology name]. How can I help you?”') +
        p('Listen to the response. The next step depends on the request, not on a memorized list of questions.') +
        list(['Appointment request: find out whether the patient has visited before.', 'Request for a specific person: direct the call to that person through the office’s handoff process.', 'Medical records or surgery: hand the call to the appropriate staff member.', 'Anything outside your knowledge: ask for help rather than guess.']) +
        box('Build the call', p('Greeting → listen → identify the request → choose the next step.')) +
        quiz('The caller asks about surgery arrangements. What should you do?', ['Answer based on what you remember from clinical work.', 'Hand the call to the appropriate surgery staff.'], 1, 'Correct. Surgery calls are handed off in this office.'),
        'Your trainer plays three callers: an appointment request, a medical-records request, and a request you cannot answer. Practice only the opening and next step.',
        'You can identify the request and explain when to hand off or ask for help.'),
      lesson('1.2', 'Recognize an Urgent Call', 'Learn the interruption before the routine workflow',
        'A scheduling call can become an urgent call as soon as a patient describes an urgent symptom.',
        list(['Flashes.', 'Sudden vision loss.', 'A curtain, shadow, or veil in vision.', 'Severe eye pain.']) +
        box('Immediate next step', p('Pause ordinary scheduling. Contact the tech lead; if unavailable, contact the doctor. Do not independently approve an add-on or decide that the patient can safely wait.'), 'warn') +
        p('You will practice the complete accommodation and ER-instruction workflow in Module 4. For now, learn to recognize when to stop and involve the lead or doctor.') +
        p('The office does not routinely ask every caller for the reason for a visit. Listen carefully when the patient volunteers a reason; urgent symptoms change the path immediately.') +
        quiz('A caller says there is suddenly a curtain across their vision. What comes next?', ['Offer the next routine opening.', 'Pause routine scheduling and contact the tech lead, or the doctor if the lead is unavailable.'], 1, 'Correct. Recognize and escalate before routine scheduling.'),
        'Practice a call that starts as “I need an appointment” and then includes a sudden visual symptom. State who you would contact.',
        'You recognize each listed symptom and know the escalation order.'),
      lesson('1.3', 'Find the Patient in Nextech', 'Name and DOB connect the caller to the record',
        'Before creating a profile, check whether the patient already has one.',
        say('“Have you been to our clinic before, or would this be your first visit?”') +
        steps(['Ask for the patient’s name and date of birth.', 'Search Nextech using name and DOB. A list of matching records may appear.', 'Confirm that the selected record matches both details. Ask for help if matches are ambiguous.', 'Only proceed toward a new profile after checking for an existing record.']) +
        box('Why this matters', p('A patient who says “first time” still needs a record search. Your search helps avoid duplicate profiles.')) +
        quiz('A caller says they are new. Can you skip searching?', ['Yes, create the profile immediately.', 'No, search by name and DOB first.'], 1, 'Correct. Search before creating a profile.'),
        'Use fictional matching records. Find the correct patient, then repeat the greeting and lookup as one short call.',
        'You can search, distinguish matches, and explain when a new profile is needed.')
    ]),
    module('fd-existing-v1', 2, 'Existing-Patient Scheduling',
      'Use an existing record to learn follow-up timing, schedule balance, insurance review, and a complete scheduling call before adding new-patient registration.',
      ['Read the last visit and follow-up instructions.', 'Choose an appropriate slot and doctor.', 'Review insurance and eligibility.', 'Move an existing appointment and close the call clearly.'], [
      lesson('2.1', 'Read the Follow-Up Instructions', 'Know what is due before offering a date',
        'Use the last visit to understand when the patient should return.',
        steps(['Find when the patient was last seen.', 'Review that visit’s follow-up instructions.', 'Use the instructed return interval to guide the next appointment.', 'Ask for help if the instructions are missing, unclear, or conflict with available appointments.']) +
        p('Do not invent a follow-up interval based on the diagnosis or on the caller’s preferred date.') +
        quiz('The last visit says return in three months. Where does scheduling begin?', ['Use that instruction to determine the intended return timing.', 'Pick any opening without reviewing the last visit.'], 0, 'Correct. Follow-up instructions guide the timing.'),
        'Your trainer supplies a fictional last-visit date and follow-up interval. Explain the intended return timing, then repeat the call through record review.',
        'You can identify the last visit and the instruction that controls follow-up timing.'),
      lesson('2.2', 'Choose a Slot Without Overloading the Doctor', 'Patient preference works within the schedule',
        'A suitable opening must fit both the patient’s timing and the doctor’s workload.',
        say('“What day works best for you? Do you prefer morning or afternoon?”') +
        list(['Distribute appointments across available doctors rather than concentrating them unnecessarily.', 'For each doctor, keep new-patient and glaucoma-workup start times at least 30 minutes apart, including combinations of those visit types.', 'Follow-up visits can fit between these longer visits when appropriate and available.', 'Patients may request another doctor, but a retina-specialist appointment requires a referral.', 'If the required timing cannot be met, ask for help. Do not independently override capacity rules.']) +
        box('Schedule example', p('If Dr. A has a new patient at 9:00, another new patient or glaucoma workup for Dr. A must start at 9:30 or later. A follow-up may fit between them if the schedule allows.')) +
        quiz('Dr. A has a new patient at 9:00. Which proposed glaucoma-workup start meets the spacing rule?', ['9:15 with Dr. A.', '9:30 with Dr. A.'], 1, 'Correct. Their start times are 30 minutes apart.'),
        'Choose slots on a fictional schedule with two doctors, follow-ups, a new patient, and a glaucoma workup. Explain the spacing and referral restriction.',
        'You can select a slot, explain the 30-minute rule, and identify when retina scheduling needs a referral.'),
      lesson('2.3', 'Plan, IPA, Eligibility & Authorization', 'Understand what each insurance question accomplishes',
        'These terms answer different questions. Learn them using the insurance information already in the patient’s record.',
        section('Insurance plan', p('The patient’s coverage, such as Clever Care. It helps identify the insurance-plan portal to use.')) +
        section('Medical group / IPA', p('A separate detail used in this office’s network and authorization workflow. A plan name alone does not establish that this location accepts the patient’s assigned group.')) +
        section('Eligibility', p('Whether the coverage is active. In Nextech, open the insurance policy and select <strong>Run Eligibility Check</strong>. Your trainer should demonstrate this in the office’s system.')) +
        section('Authorization', p('Approval for the required visit or service. A PCP referral and an authorization are not interchangeable. Active insurance does not by itself establish that authorization requirements are complete.')) +
        box('Location reference', p('Use the current accepted-plan and IPA reference for the location where the patient will be seen. Portals and credentialing may differ by location; no universal list is supplied here.')) +
        quiz('You know the insurance-plan name. What still needs attention?', ['The assigned group, location acceptance, eligibility, and required authorization.', 'Nothing else; the plan name confirms everything.'], 0, 'Correct. Each item answers a different question.'),
        'Ask your trainer to point out the plan, assigned group, eligibility result, and authorization in an approved training record.',
        'You can explain the difference between all four concepts in plain language.'),
      lesson('2.4', 'Check Existing-Patient Coverage', 'Reuse the insurance concepts during the call',
        'Before finishing scheduling or rescheduling, review the patient’s current coverage.',
        say('“Is your insurance still the same?”') +
        steps(['Review the current insurance policy and use Run Eligibility Check as appropriate.', 'If coverage has changed or terminated, obtain the new insurance information and verify it.', 'For HMO coverage, address the required authorization. Under this office’s described workflow, PPO coverage does not require authorization; coverage and location acceptance still need verification.', 'For urgent symptoms, use the urgent-call path rather than ending the clinical escalation because of insurance.']) +
        box('Trainer clarification required: pending follow-up authorization', p('The office has described submission timing, but has not yet confirmed whether a follow-up appointment may be booked while authorization is pending. Ask the trainer before completing a booking that depends on this rule.'), 'warn') +
        quiz('The old insurance is terminated and the patient now has HMO coverage. What should you do?', ['Continue using the old coverage.', 'Verify the new coverage and address its authorization requirements.'], 1, 'Correct. Do not rely on the terminated policy.'),
        'Practice an unchanged-insurance call, then a changed-insurance call. Identify what must be verified and where you need help.',
        'You can find the eligibility check and identify the authorization branch without guessing the pending-booking rule.'),
      lesson('2.5', 'Move an Appointment & Close the Call', 'Combine the first complete workflow',
        'You can now connect lookup, follow-up review, insurance review, slot selection, and a clear closing.',
        box('Routine call flow', p('Greet → search by name and DOB → review last visit and follow-up → check coverage and authorization requirements → select a suitable slot → confirm.')) +
        p('For rescheduling, <strong>move the existing appointment</strong>. Ask your trainer to demonstrate the Nextech action; do not create an additional appointment for the same request.') +
        section('Before ending the call', p(close)) +
        say('“Your appointment is on [date] at [time] with Dr. [name]. Please bring your ID and insurance cards, including your Medicare card if you have Medicare. Bring any eye-drop medications you use and a current medication list.”') +
        p('Age can prompt a Medicare question, but does not establish enrollment. Ask about actual coverage and request the card if applicable. <a href="https://www.medicare.gov/basics/get-started-with-medicare/sign-up/how-do-i-sign-up-for-medicare?linkId=196034026" target="_blank" rel="noopener noreferrer">Medicare enrollment guidance</a>.') +
        box('Trainer clarification required: call documentation', p('The office has not specified where or how these calls are documented in Nextech. Have the trainer demonstrate the approved process; this course does not invent a note location or template.'), 'warn') +
        quiz('A patient needs a different appointment date. What happens to the existing appointment?', ['Move it to the appropriate new slot.', 'Leave it and add another appointment.'], 0, 'Correct. Move the existing appointment.'),
        'Perform one complete follow-up call, then repeat it as a reschedule. Include all closing reminders.',
        'You can complete the routine sequence, move the appointment, and repeat the doctor, date, time, and reminders.')
    ]),
    module('fd-new-v1', 3, 'New Patients & Authorization Management',
      'Build on familiar scheduling skills: verify the caller’s insurance, locate authorization, create the Nextech profile, then finish the appointment.',
      ['Ask the plan and IPA questions naturally.', 'Verify information in the appropriate portals.', 'Handle unknown insurance and missing authorization.', 'Create a profile and maintain authorization details.'], [
      lesson('3.1', 'Ask the Plan & Medical-Group Questions', 'Use a familiar insurance concept in a new conversation',
        'A new patient does not yet have a complete record to review. You gather the same information you learned to recognize in Module 2.',
        say('Patient: “I would like to make an appointment.”<br>Staff: “Have you been to our clinic before, or would this be your first visit?”<br>Patient: “First time.”<br>Staff: “What insurance plan do you have?”<br>Patient: “Clever Care.”<br>Staff: “What medical group is it under?”') +
        p('If the caller does not understand “medical group,” examples such as Seoul Medical Group or Center can clarify the question. These are examples from the office’s conversation, not a statement that every location accepts them.') +
        steps(['Ask the insurance plan and medical group.', 'Collect name and DOB and search Nextech before creating a record.', 'Use name, DOB, and any needed identifying information in the insurance-plan portal.', 'Confirm the coverage and assigned group; use the location reference to check acceptance.']) +
        quiz('The patient knows their plan but not their medical group. What can help?', ['Guess the group from the plan name.', 'Check the assigned group through the insurance-plan portal.'], 1, 'Correct. The plan portal can identify the assigned group.'),
        'Practice the Clever Care conversation. Your trainer first knows the group, then does not know it. Explain what you will verify next.',
        'You can ask both questions without treating the plan and IPA as the same thing.'),
      lesson('3.2', 'Handle Unknown Insurance & Missing Authorization', 'Change only the part of the call that needs attention',
        'When information is missing, explain the next action rather than guessing.',
        section('Insurance plan unknown', p('Ask what information the caller has available. You may name plans accepted by the location or ask for the member ID. Some plans have recognizable number/letter patterns; use these as clues, then verify through the appropriate portal.')) +
        p('If insurance cannot be identified, explain that the office cannot complete the insurance-based scheduling process with the information available. Encourage the caller to call back with the details. A cash visit is an option to discuss; the office has not supplied prices or a cash-booking process here.') +
        section('HMO authorization missing', p('After verifying the plan and group, check the IPA portal for the required authorization. If none is available from the PCP, the patient must contact the PCP to send it before the new-patient appointment can be made.')) +
        say('“Please contact your PCP and ask them to send us the authorization. Once we have it, we can make your appointment.”') +
        box('Urgent symptoms take a different path', p('Do not use this routine missing-information workflow as the complete response to an urgent symptom. Escalate and follow Module 4.'), 'warn') +
        quiz('A routine new HMO patient has no required PCP authorization. What should you explain?', ['The PCP needs to send the authorization before the appointment can be made.', 'An active policy always replaces authorization.'], 0, 'Correct. Active coverage alone does not replace required authorization.'),
        'Practice one caller with no insurance information and one with verified HMO coverage but no authorization.',
        'You can explain the next action without promising coverage or inventing a cash price.'),
      lesson('3.3', 'Create the Nextech Profile', 'Transfer verified information into the patient record',
        'Once the required verification is complete and no existing profile is found, create the patient’s profile.',
        say('“Give me one moment while I create your profile.”') +
        list(['First and last name.', 'Date of birth.', 'Gender.', 'Address: confirm it with the patient.', 'Phone number: confirm it with the patient.', 'Primary care physician.', 'Verified insurance information.']) +
        p('Your trainer should demonstrate the relevant Nextech screens. This course lists the confirmed information to enter without inventing button names or unconfirmed navigation.') +
        box('Connect to the next lesson', p('The profile identifies the patient and coverage. Next, record the authorization that supports the required visit.')) +
        quiz('Which information did the office specifically ask staff to confirm with the patient?', ['Address and phone number.', 'Only the preferred appointment day.'], 0, 'Correct. Confirm address and phone number during registration.'),
        'Create a fictional patient profile under supervision. Read back the address and phone number before finishing.',
        'You can enter the supplied fields accurately and explain why you searched first.'),
      lesson('3.4', 'Enter & Maintain Authorizations', 'Record the approval details and follow its status',
        'An authorization entry must reflect what the portal actually shows.',
        section('Authorization-tab information', list(['Authorization number.', 'Status: approved, pending, or denied.', 'The group that issued the authorization.', 'Authorized start and end dates.'])) +
        section('Office-reported turnaround times', list(['Urgent follow-up requests typically return the same day.', 'Routine requests may take 1–4 days, depending on the codes.', 'Requests involving procedure codes may take about 1–2 weeks.'])) +
        p('These are expected timeframes, not guaranteed approval dates. Only use an urgent submission when appropriate under the office’s direction.') +
        steps(['Record the current status accurately.', 'When approval is confirmed, update the pending entry to approved and confirm the approved details.', 'Inactivate denied or expired authorizations. Inactivation does not replace obtaining a required valid authorization.']) +
        box('Do not assume approval', p('Submitting an urgent request does not mean it is already approved. The follow-up booking rule while authorization is pending still needs trainer clarification.'), 'warn') +
        quiz('An urgent request was just submitted. May you mark it approved immediately?', ['Yes, urgent submissions are always approved.', 'No, update to approved only after approval is confirmed.'], 1, 'Correct. The entry must reflect confirmed status.'),
        'Enter a fictional pending authorization, update it from a sample approval, and demonstrate what to do with a denied or expired entry.',
        'You can enter all authorization fields and distinguish submission, pending status, approval, and inactivation.'),
      lesson('3.5', 'Complete the New-Patient Call', 'Connect verification, registration, and scheduling',
        'The final part is familiar: reuse the scheduling and closing skills from Module 2.',
        steps(['Greet and determine whether the patient has visited before; listen for urgent symptoms throughout.', 'Ask plan and medical group. Collect name and DOB and search for an existing profile.', 'Verify information in the insurance-plan portal and check the location’s network reference.', 'For HMO coverage, find the required authorization in the IPA portal; stop routine new-patient booking if it is missing.', 'Create the profile when needed. Confirm address and phone; enter PCP and insurance.', 'Record the authorization details in the authorization tab.', 'Ask day and morning/afternoon preference. Choose an appropriate doctor and slot, following spacing and retina-referral rules.', close]) +
        quiz('After registration is complete, which skills do you reuse?', ['The schedule-selection rules and closing reminders from Module 2.', 'A separate scheduling process with no workload rules.'], 0, 'Correct. New registration leads into the scheduling workflow you already know.'),
        'Role-play a complete new HMO patient call with verified coverage and an approved authorization. Repeat it with an unknown IPA.',
        'You can connect the steps naturally and explain why each verification happens before the next task.')
    ]),
    module('fd-urgent-practice-v1', 4, 'Urgent Calls & Supervised Practice',
      'Combine the skills you have learned. Practice urgent escalation, routine exceptions, and complete calls with progressively less prompting.',
      ['Use the tech-lead then doctor escalation order.', 'Relay the office’s immediate-care instruction when accommodation is unavailable.', 'Keep authorization status accurate.', 'Demonstrate complete workflows under supervision.'], [
      lesson('4.1', 'Urgent Accommodation & Immediate-Care Instructions', 'Capacity approval and clinical escalation work together',
        'Your role is to recognize, escalate, obtain accommodation approval, and relay the office’s instructions.',
        urgent +
        box('Office instruction when accommodation is unavailable', say('“If you are experiencing severe eye pain or visual disturbance, go to the emergency room to get treated as soon as possible.”'), 'warn') +
        p('The doctor may decline an add-on when it would overload the schedule and delay consultations for already-scheduled patients. The trainee does not override that decision. Insurance changes may prevent this office from obtaining authorization under the described urgent workflow; they do not eliminate the need to relay the immediate-care instruction.') +
        p('Flashes and a curtain/shadow can indicate retinal detachment, which requires immediate evaluation. Do not advise waiting for symptoms to worsen. <a href="https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/retinal-detachment" target="_blank" rel="noopener noreferrer">National Eye Institute guidance</a>.') +
        quiz('The tech lead is unavailable during an urgent call. Who do you ask about accommodation?', ['The doctor.', 'No one; add the patient without approval.'], 0, 'Correct. Ask the doctor when the tech lead is unavailable.') +
        quiz('Same-day accommodation is declined for a caller with severe eye pain or visual disturbance. What must be relayed?', ['Wait for worsening before seeking care.', 'Go to the ER for treatment ASAP.'], 1, 'Correct. Relay the office’s immediate-care instruction; do not wait for worsening.'),
        'Practice an approved add-on, a doctor-declined add-on, and an urgent caller whose changed insurance prevents the office visit.',
        'You can escalate promptly, obtain approval, and relay the ER instruction without diagnosing or promising authorization.'),
      lesson('4.2', 'Practice One Complication at a Time', 'Explain your next step before acting',
        'Use each scenario as a short role-play. Try your response before opening the expected approach.',
        reveal('Scenario A: Unknown IPA', p('A new caller knows the plan but not the medical group.') + box('Expected approach', p('Verify the caller’s information in the insurance-plan portal, identify the assigned group, and check the location reference. Do not guess.'))) +
        reveal('Scenario B: Missing PCP authorization', p('A routine new HMO caller has verified insurance but no authorization.') + box('Expected approach', p('Ask the patient to contact the PCP to send the authorization. Explain that the appointment can be made once the required authorization is available.'))) +
        reveal('Scenario C: Changed coverage', p('An existing patient’s policy is terminated and they now have HMO coverage.') + box('Expected approach', p('Verify the new coverage and required authorization. Ask the trainer about pending follow-up booking; do not infer a rule.'))) +
        reveal('Scenario D: Retina request', p('A patient wants the retina specialist but no referral is established in the information provided.') + box('Expected approach', p('A retina-specialist appointment requires a referral. Ask for help with confirming the referral; the source and exact referral-verification screen have not been specified.'))) +
        reveal('Scenario E: Rescheduling', p('An existing patient wants a different day.') + box('Expected approach', p('Review follow-up timing, check coverage and authorization requirements, select a suitable slot, move the existing appointment, and repeat the closing details.'))) +
        reveal('Scenario F: Urgent symptoms', p('A caller reports sudden vision loss while asking about an appointment.') + box('Expected approach', p('Pause routine scheduling. Escalate to the tech lead or doctor and follow the urgent accommodation and immediate-care instructions.'))),
        'Use one scenario per attempt. After each, name the decision that changed the call, then retry from the greeting.',
        'You can choose the correct branch without needing to memorize six separate call scripts.'),
      lesson('4.3', 'Complete Calls & Trainer Readiness Review', 'Lesson completion is followed by observed practice',
        'Demonstrate the whole workflow with fictional patient information. Your trainer decides when you are ready for independent work.',
        section('Complete-call practice', list(['An existing patient scheduling a follow-up with unchanged insurance.', 'An existing patient moving an appointment.', 'A new HMO patient with verified coverage and approved authorization.', 'A new patient whose IPA is unknown.', 'A routine caller missing required authorization.', 'An urgent caller who needs accommodation or immediate-care instructions.', 'A surgery, medical-records, or out-of-scope request requiring a handoff.'])) +
        box('Trainer observation checklist', list(['Identifies the request and recognizes urgent symptoms.', 'Finds the correct record before creating a profile.', 'Uses follow-up instructions and workload rules.', 'Distinguishes plan, IPA, eligibility, and authorization.', 'Enters verified demographics and authorization details accurately.', 'Moves the existing appointment when rescheduling.', 'Confirms date, time, doctor, and what to bring.', 'Asks for help instead of inventing an answer.']), 'check') +
        box('Resolve locally before independent work', list(['Whether follow-up appointments may be booked while authorization is pending.', 'Where and how scheduling calls are documented in Nextech.', 'Current location-specific accepted plans, IPAs, portals, and escalation contacts.', 'How this location verifies a qualifying retina referral.']), 'warn') +
        p('The course remembers progress on this device. It does not save trainer sign-off or clinical competency approval.'),
        'Have your trainer play the caller without prompting. Afterward, explain each important decision and repeat any step that needed help.',
        'Your trainer has observed the required workflows and resolved the local questions that affect your work.')
    ])
  ];
};
