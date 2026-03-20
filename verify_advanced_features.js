const mongoose = require('mongoose');
const PageView = require('./server/models/PageView');
const AuditLog = require('./server/models/AuditLog');
const Message = require('./server/models/Message');
const dotenv = require('dotenv');

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Verify PageView Schema
        const testView = new PageView({
            page: 'test-page',
            sessionID: 'test-session',
            userAgent: 'test-agent'
        });
        await testView.save();
        console.log('✅ PageView Save Verified');

        // 2. Verify AuditLog Schema
        const testLog = new AuditLog({
            admin: new mongoose.Types.ObjectId(),
            action: 'TEST_ACTION',
            resource: 'test',
            details: { foo: 'bar' }
        });
        await testLog.save();
        console.log('✅ AuditLog Save Verified');

        // 3. Verify Message Status Field
        const testMessage = new Message({
            name: 'Test',
            email: 'test@example.com',
            message: 'Hello'
        });
        console.log('Initial Status:', testMessage.status);
        testMessage.status = 'CONTACTED';
        await testMessage.save();
        console.log('✅ Message Status Update Verified');

        // Cleanup
        await PageView.deleteOne({ page: 'test-page' });
        await AuditLog.deleteOne({ action: 'TEST_ACTION' });
        await Message.deleteOne({ _id: testMessage._id });

        await mongoose.disconnect();
        console.log('Disconnected');
    } catch (err) {
        console.error('Verification Failed:', err);
        process.exit(1);
    }
};

verify();
