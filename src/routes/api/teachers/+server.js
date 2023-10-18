// import { json } from '@sveltejs/kit';
// import sql from 'mssql';

// const config = {
// 	server: 'sequoia.database.windows.net',
// 	database: 'amsv2',
// 	user: 'sequoia',
// 	password: '',
// 	options: {
// 		encrypt: true // Use SSL for the connection
// 	}
// };

// export async function GET() {
// 	let pool;

// 	try {
// 		// Create a connection pool
// 		pool = await sql.connect(config);

// 		// Execute your SQL query to fetch teachers
// 		const result = await pool.request().query(`
//       SELECT TOP (1000) [Id], [FullName], [CorporateId], [IsMale], [PhoneNumber], [Address], [PhotoId], [CreatedAt], [CreatedBy], [UpdatedAt], [UpdatedBy], [IsDeleted], [DeletedAt], [DeletedBy], [Timestamp], [Active], [ShortName]
//       FROM [dbo].[Teacher]
//     `);

// 		// Return the fetched data as JSON
// 		return json(result.recordset);
// 	} catch (error) {
// 		console.error('Error fetching data from Azure SQL Database:', error);
// 		return json({ error: 'An error occurred while fetching data.' });
// 	} finally {
// 		if (pool) {
// 			// Close the connection pool when done
// 			pool.close();
// 		}
// 	}
// }
