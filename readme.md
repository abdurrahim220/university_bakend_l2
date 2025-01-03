# Project Structure

```plaintext
.env
.env.example
.gitignore
.prettierrc.json
eslint.config.mjs
package.json
readme.md
src/
    ├── app.ts
    ├── build/
    │   └── QueryBuilder.ts
    ├── config/
    │   └── index.ts
    ├── errors/
    │   ├── AppError.ts
    │   ├── handleCastError.ts
    │   ├── handleDublicateError.ts
    │   ├── handleValidationErrors.ts
    │   └── handleZodErrors.ts
    ├── interface/
    │   ├── errorInterface.ts
    │   └── index.d.ts
    ├── middleware/
    │   ├── auth.ts
    │   ├── globalErrorHandler.ts
    │   ├── notFound.ts
    │   └── validateRequest.ts
    ├── module/
    │   ├── academicDepartment/
    │   │   ├── academicDepartment.controller.ts
    │   │   ├── academicDepartment.interface.ts
    │   │   ├── academicDepartment.model.ts
    │   │   ├── academicDepartment.route.ts
    │   │   ├── academicDepartment.service.ts
    │   │   └── academicDepartment.validation.ts
    │   ├── academicFaculty/
    │   │   ├── academicFaculty.controller.ts
    │   │   ├── academicFaculty.interface.ts
    │   │   ├── academicFaculty.model.ts
    │   │   ├── academicFaculty.route.ts
    │   │   ├── academicFaculty.service.ts
    │   │   └── academicFaculty.validation.ts
    │   ├── academicSemester/
    │   │   ├── academicSemester.controller.ts
    │   │   ├── academicSemester.interface.ts
    │   │   ├── academicSemester.model.ts
    │   │   ├── academicSemester.route.ts
    │   │   ├── academicSemester.service.ts
    │   │   └── academicSemester.validation.ts
    │   ├── admin/
    │   │   ├── admin.controller.ts
    │   │   ├── admin.interface.ts
    │   │   ├── admin.model.ts
    │   │   ├── admin.route.ts
    │   │   ├── admin.service.ts
    │   │   └── admin.validation.ts
    │   ├── auth/
    │   │   ├── auth.controller.ts
    │   │   ├── auth.interface.ts
    │   │   ├── auth.model.ts
    │   │   ├── auth.route.ts
    │   │   ├── auth.service.ts
    │   │   └── auth.validation.ts
    │   ├── course/
    │   │   ├── course.controller.ts
    │   │   ├── course.interface.ts
    │   │   ├── course.model.ts
    │   │   ├── course.route.ts
    │   │   ├── course.service.ts
    │   │   └── course.validation.ts
    │   ├── department/
    │   │   ├── department.controller.ts
    │   │   ├── department.interface.ts
    │   │   ├── department.model.ts
    │   │   ├── department.route.ts
    │   │   ├── department.service.ts
    │   │   └── department.validation.ts
    │   ├── enrolledCourse/
    │   │   ├── enrolledCourse.controller.ts
    │   │   ├── enrolledCourse.interface.ts
    │   │   ├── enrolledCourse.model.ts
    │   │   ├── enrolledCourse.route.ts
    │   │   ├── enrolledCourse.service.ts
    │   │   └── enrolledCourse.validation.ts
    │   ├── faculty/
    │   │   ├── faculty.controller.ts
    │   │   ├── faculty.interface.ts
    │   │   ├── faculty.model.ts
    │   │   ├── faculty.route.ts
    │   │   ├── faculty.service.ts
    │   │   └── faculty.validation.ts
    │   ├── managementDepartment/
    │   │   ├── managementDepartment.controller.ts
    │   │   ├── managementDepartment.interface.ts
    │   │   ├── managementDepartment.model.ts
    │   │   ├── managementDepartment.route.ts
    │   │   ├── managementDepartment.service.ts
    │   │   └── managementDepartment.validation.ts
    │   ├── student/
    │   │   ├── student.controller.ts
    │   │   ├── student.interface.ts
    │   │   ├── student.model.ts
    │   │   ├── student.route.ts
    │   │   ├── student.service.ts
    │   │   └── student.validation.ts
    │   └── user/
    │       ├── user.controller.ts
    │       ├── user.interface.ts
    │       ├── user.model.ts
    │       ├── user.route.ts
    │       ├── user.service.ts
    │       └── user.validation.ts
    ├── router/
    │   └── index.ts
    ├── server.ts
    └── utils/
        ├── helper.ts
        └── logger.ts
tsconfig.json
uploads/
    └── text.txt