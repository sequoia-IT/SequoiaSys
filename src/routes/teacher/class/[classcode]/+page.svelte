<script lang="ts">
	import { page } from '$app/stores';
	import { USER_SUBJECT } from '$lib/store';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let student_classes = data.parsedlist
    let teacher_group = data.classgroup?.group
    let count = new Array(student_classes.length).fill(1);
</script>

<h1 class="text-2xl mb-10">CLASSES {$page.params.classcode}</h1>

<div class="overflow-x-auto">
	<table class="table table-xs table-pin-rows table-pin-cols">
		<thead>
			<tr>
				<th>No</th>
				<td>StudentID</td>
				<td>Student Name</td>
				<td>Division Group</td>
			</tr>
		</thead>
		<tbody>
		{#each student_classes as classroom,index }
            <tr >
                <td colspan="3" class="bg-base-200">{classroom.classcode}</td>
            </tr>
                {#each classroom.students as student,i}
                {#if student[$USER_SUBJECT]===teacher_group    }
                <tr>
                    <td>{count[index]++}</td>  
                    <td>{student.studentID}</td>  
                    <td>{student.Students.name}</td>  
                    <td>{student[$USER_SUBJECT]}</td>
                   </tr>
                {/if}
                  
                {/each}
                <td></td>
        {/each}
		</tbody>
		<tfoot>
			<tr>
				<th>No</th>
				<td>StudentID</td>
				<td>Student Name</td>
				<td>Division Group</td>

			</tr>
		</tfoot>
	</table>
</div>

