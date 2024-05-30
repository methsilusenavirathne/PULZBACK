const Team = require('../models/Team')
const Member = require('../models/Member')
const {verifyTeam,verifyMember} = require('../utils/register.funcs')

const asyncTimeout = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
};

module.exports.register = async(req,res)=>{
    try {
        if(!req.body){
            return res.send({
                success: false,
                message: 'Something went wrong!'
            })
        }
        const {school,TICName,TICMobile,competition,members} = req.body
        try {
            const isValid = await verifyTeam(school,TICName,TICMobile,competition)
        } catch (error) {
            return res.send({
                success: false,
                message: error
            })
        }
        if(!members || members.length == 0){
            return res.send({
                success: false,
                message: 'Invalid Members!'
            })
        }
        if(members.length > 5){
            return res.send({
                success: false,
                message: 'Cannot contain more than 5 members!'
            })
        }
        const filteredMembers = members.filter((member)=> (member.role && member.role === 'Leader'))
        if(filteredMembers.length == 0 && members.length > 1){
            return res.send({
                success: false,
                message: 'Team should have a Leader!'
            })
        }
        if(filteredMembers.length > 1){
            return res.send({
                success: false,
                message: 'Team should not have more than one Leader!'
            })
        }
        const isTeamExcisted = await Team.countDocuments({school,competition})
        if(isTeamExcisted){
            return res.send({
                success: false,
                message: 'Team is already excisted!'
            })
        }
        const newTeam = new Team({
            school,
            TICName,
            TICMobile,
            competition
        })
        const savedTeam = await newTeam.save()
        if(!savedTeam){
            return res.send({
                success: false,
                message: 'Unable to save the team!'
            })
        }

        members.map(async(member) => {
            try {
                if(member.role){
                    const isValid = await verifyMember(member.name,member.email,member.mobile,member.role)
                    const newMember = new Member({
                        name:member.name,
                        email:member.email,
                        mobile:member.mobile,
                        role:member.role,
                        team:savedTeam._id
                    })
                    const savedTeam = await newMember.save()
                    if(!savedTeam){
                        return res.send({
                            success: false,
                            message: 'Unable to save the members!'
                        })
                    }
                }else{
                    if(members.length == 1){
                        const isValid = await verifyMember(member.name,member.email,member.mobile)
                        const newMember = new Member({
                            name:member.name,
                            email:member.email,
                            mobile:member.mobile,
                            team:savedTeam._id,
                            role:'Leader'
                        })
                        const savedTeam = await newMember.save()
                        if(!savedTeam){
                            return res.send({
                                success: false,
                                message: 'Unable to save the members!'
                            })
                        }
                    }else{
                        const isValid = await verifyMember(member.name,member.email,member.mobile)
                        const newMember = new Member({
                            name:member.name,
                            email:member.email,
                            mobile:member.mobile,
                            team:savedTeam._id
                        })
                        const savedTeam = await newMember.save()
                        if(!savedTeam){
                            return res.send({
                                success: false,
                                message: 'Unable to save the members!'
                            })
                        }
                    }
                }

            } catch (error) {
                return res.send({
                    success: false,
                    message: error
                })
            }
        });
        // await asyncTimeout(3000);
        return res.send({
            success: true,
            message: 'Successfully save the members!'
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: 'Something went wrong!'
        })
    }
}