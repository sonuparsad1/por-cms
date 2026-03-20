const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Project = require('../../models/Project');
const Blog = require('../../models/Blog');
const Message = require('../../models/Message');
const PageView = require('../../models/PageView');

// @route   POST /api/analytics/pageview
// @desc    Track a page view
// @access  Public
router.post('/pageview', async (req, res) => {
    const { page, referrer, sessionID } = req.body;
    try {
        const view = new PageView({
            page: page || 'home',
            referrer,
            sessionID,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
        await view.save();
        res.status(201).json({ success: true });
    } catch (err) {
        console.error('Analytics Error:', err);
        res.status(500).json({ error: 'Failed to record analytics' });
    }
});

// @route   GET /api/analytics/summary
// @desc    Get dashboard analytics summary
// @access  Private (Admin)
router.get('/summary', auth, async (req, res) => {
    try {
        const [projectCount, blogCount, messageCount, unreadMessages] = await Promise.all([
            Project.countDocuments(),
            Blog.countDocuments(),
            Message.countDocuments(),
            Message.countDocuments({ isRead: false }),
        ]);

        // Time-series data: Last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyViews = await PageView.aggregate([
            { $match: { timestamp: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    views: { $sum: 1 },
                    uniqueVisitors: { $addToSet: "$sessionID" }
                }
            },
            { $sort: { "_id": 1 } },
            {
                $project: {
                    name: "$_id",
                    views: 1,
                    visitors: { $size: "$uniqueVisitors" },
                    _id: 0
                }
            }
        ]);

        // Top pages
        const topPages = await PageView.aggregate([
            { $group: { _id: "$page", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            counts: {
                projects: projectCount,
                blogs: blogCount,
                messages: messageCount,
                unreadMessages
            },
            charts: {
                dailyViews
            },
            topPages
        });
    } catch (err) {
        console.error('Analytics Fetch Error:', err);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

module.exports = router;
