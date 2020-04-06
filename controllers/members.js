const fs = require('fs')
const data = require("../data.json")
const { date } = require("../utils")


exports.index = (req, res) => {
    return res.render("members/index", { members: data.members })
}
exports.create = (req, res) => {
    return res.render("members/create")
}
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send("Please, fill all filds")
    }


    birth = Date.parse(req.body.birth)

    let id = 1

    const lastMember = data.members[data.members.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write fille error!")

        return res.redirect("/members")
    })
}
exports.show = (req, res) => {

    const { id } = req.params

    const foundmember = data.members.find(function(member) {
        return member.id == id
    })

    if (!foundmember) return res.send("member not found")

    const member = {
        ...foundmember,
        birth: date(foundmember.birth).birthDay,
    }
    return res.render("members/show", { member })
}
exports.edit = (req, res) => {

    const { id } = req.params

    const foundmember = data.members.find(function(member) {
        return member.id == id
    })

    if (!foundmember) return res.send("member not found")

    const member = {
        ...foundmember,
        birth: date(foundmember.birth).iso
    }

    return res.render("members/edit", { member })
}
exports.put = (req, res) => {

    const { id } = req.body
    let index = 0

    const foundmember = data.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundmember) return res.send("member not found")


    const member = {
        ...foundmember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write fille error!")

        return res.redirect(`/members/${id}`)
    })

}
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredmembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredmembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write fille error!")

        return res.redirect("/members")
    })
}